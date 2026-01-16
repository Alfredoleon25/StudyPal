const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const authenticate = require('./auth');

console.log("Starting backend...");
require('dotenv').config();
// Create PostgreSQL connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL 
  ,ssl: {
    // This allows connecting to Supabase's self-signed certificates
    rejectUnauthorized: false 
  }
});

// Create adapter
const adapter = new PrismaPg(pool);

// Create Prisma Client with adapter
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors(
  {
  origin: 'https://study-pal-gamma-two.vercel.app', // Allow all origins for development
  credentials: true
}
));
app.use(express.json());

app.post("/users",authenticate, async (req, res) => {
  try {
    
    const { name, learnSubjects, teachSubjects } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }


    const user = await prisma.user.create({
      data: { 
        id: req.user.id,
        name, 
        learnSubjects: learnSubjects || [],
        teachSubjects: teachSubjects || []
      },
    });
    console.log("user Created",user)
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


app.get("/me", authenticate, async (req, res) => {

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  res.json(user); // null if profile not created yet
});


app.get("/tutors", authenticate,async (req, res) => {
  try {
    const { subjects } = req.query;
    
    if (subjects) {
      const subjectArray = subjects.split(',');
      console.log("Looking for tutors who can teach:", subjectArray);
      
      const tutors = await prisma.user.findMany({
        where: {
          teachSubjects: { hasSome: subjectArray },
        },
      });
      
      console.log("Found tutors:", tutors.length);
      res.json(tutors);
    } else {
      const tutors = await prisma.user.findMany({
        where: {
          teachSubjects: { isEmpty: false }
        }
      });
      res.json(tutors);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tutors" });
  }
});

app.patch("/users/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { learnSubjects, teachSubjects } = req.body;
    
    const updateData = {};
    if (learnSubjects !== undefined) updateData.learnSubjects = learnSubjects;
    if (teachSubjects !== undefined) updateData.teachSubjects = teachSubjects;
    
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.post("/chats", authenticate, async (req, res) => {
  try {
    const { learnerId, tutorId, subject } = req.body;
  
    // Check if chat already exists
    const existingChat = await prisma.chat.findUnique({
      where: {
        learnerId_tutorId_subject: {
          learnerId,
          tutorId,
          subject,
        }
      }
    });
    
    if (existingChat) {
      return res.json(existingChat);
    }
    
    // Create new chat
    const chat = await prisma.chat.create({
      data: {
        learnerId,
        tutorId,
        subject,
      },
    });
    
    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create chat" });
  }
});
/* -----------------------
   Get Chats for User
------------------------ */
app.get("/chats/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { learnerId: userId },
        {tutorId: userId }
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
   Get Requests Setn by Tutor
------------------------ */
app.get("/requests/tutor/:tutorId", authenticate, async (req, res) => {
  try {
    const { tutorId } = req.params;
    
    const chats = await prisma.chat.findMany({
      where: {tutorId},
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
   Get Requests Sent by Learner
------------------------ */
app.get("/requests/learner/:learnerId", authenticate, async (req, res) => {
  try {
    const { learnerId } = req.params;
    console.log("Fetching requests from learnerId:", learnerId);
    
    const requests = await prisma.chat.findMany({
      where: { learnerId },
      include: {
        tutor: {select: {id: true,name: true,}},
         messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Get last message
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log("Found requests:", requests.length);
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});
/* -----------------------
   Get Messages in a Chat
------------------------ */
app.get("/chats/:chatId/messages", authenticate, async (req, res) => {
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
app.post("/chats/:chatId/messages", authenticate, async (req, res) => {
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


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});