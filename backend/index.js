const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// Create PostgreSQL connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
console.log('this is the DATABASE_URL:', process.env.DATABASE_URL);
// Create adapter
const adapter = new PrismaPg(pool);

// Create Prisma Client with adapter
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

/* -----------------------
   Create User
------------------------ */
app.post("/users", async (req, res) => {

  try {
    const { name, role, subjects} = req.body;
    const user = await prisma.user.create({
      data: { name, role, subjects},
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/* -----------------------
   Get Tutors by Subject
------------------------ */
app.get("/tutors", async (req, res) => {
  try {
    const { subject } = req.query;
    console.log("this is the subject",subject)
    const subjectArray = subject.split(',');
    const tutors = await prisma.user.findMany({
      where: {
        role: "tutor",
        subjects: { hasSome: subjectArray },
      },
    });
    console.log("this is are the tutors that for these subjects",tutors)
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tutors" });
  }
});


/* -----------------------
   Create Help Request
------------------------ */
// app.post("/requests", async (req, res) => {
//   try {
//     const { learnerId, tutorId, subject, message } = req.body;
//     const request = await prisma.request.create({
//       data: { learnerId, tutorId, subject, message },
//     });
//     res.json(request);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create request" });
//   }
// });
/* -----------------------
   Create Help Request & Chat
------------------------ */
app.post("/requests", async (req, res) => {
  try {
    const { learnerId, tutorId, subject} = req.body;
    
    // Create the request
    // const request = await prisma.request.create({
    //   data: { learnerId, tutorId, subject},
    // });
    
    // Check if chat already exists
    let chat = await prisma.chat.findUnique({
      where: {
        learnerId_tutorId_subject: {
          learnerId,
          tutorId,
          subject,
        }
      }
    });
    
    // If no chat exists, create one
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          learnerId,
          tutorId,
          subject,
        }
      });
      
      // Create first message in the chat
      // await prisma.message.create({
      //   data: {
      //     chatId: chat.id,
      //     senderId: learnerId,
      //     content: message,
      //   }
      // });
    }
    
    res.json({ chatId: chat.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create request" });
  }
});

/* -----------------------
   Get Chats for User
------------------------ */
app.get("/chats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { learnerId: userId },
          { tutorId: userId }
        ]
      },
      include: {
        learner: { select: { id: true, name: true } },
        tutor: { select: { id: true, name: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Get last message
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

/* -----------------------
   Get Messages in a Chat
------------------------ */
app.get("/chats/:chatId/messages", async (req, res) => {
  try {
    const { chatId } = req.params;
    
    const messages = await prisma.message.findMany({
      where: { chatId },
      include: {
        sender: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
    
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

/* -----------------------
   Send Message in Chat
------------------------ */
app.post("/chats/:chatId/messages", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { senderId, content } = req.body;
    
    const message = await prisma.message.create({
      data: {
        chatId,
        senderId,
        content,
      },
      include: {
        sender: { select: { id: true, name: true } }
      }
    });
    
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

/* -----------------------
   Get Requests for Tutor
// ------------------------ */
app.get("/requests/:tutorId", async (req, res) => {
  try {
    const { tutorId } = req.params; 
    const requests = await prisma.chat.findMany({
      where: { tutorId },
        include: {
          learner: {
            select: {
              name: true,
            },
          // messages:{
          //   select:{
          //     content: true,
          //   }
          // }
        }
      }
    });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

/* -----------------------
   Server Start
------------------------ */
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});