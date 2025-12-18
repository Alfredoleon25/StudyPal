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
    const subjectArray = subject.split(',');
    console.log("this are the subjects",subject)
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
app.post("/requests", async (req, res) => {
  try {
    const { learnerId, tutorId, subject, message } = req.body;
    const request = await prisma.request.create({
      data: { learnerId, tutorId, subject, message },
    });
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create request" });
  }
});

/* -----------------------
   Get Requests for Tutor
------------------------ */
app.get("/requests/:tutorId", async (req, res) => {
  try {
    const { tutorId } = req.params; 
    const requests = await prisma.request.findMany({
      where: { tutorId },
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