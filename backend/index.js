

const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const { courses } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * POST /courses
 * Create a new course
 */
app.post("/test", (req, res) => {
  res.json({ message: "TEST ROUTE WORKING" });
});

app.post("/courses", auth, (req, res) => {
  const { id, title, lessons } = req.body;

  if (!id || !title || !lessons) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const exists = courses.find((c) => c.id === id);
  if (exists) {
    return res.status(400).json({ error: "Course already exists" });
  }

  const newCourse = {
    id,
    title,
    lessons,
    progress: {}, // userId → progress
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

/**
 * GET /courses/:id
 * Get course details
 */
app.get("/courses/:id", auth, (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.json(course);
});

/**
 * POST /courses/:id/progress
 * Update user progress
 */
app.post("/courses/:id/progress", auth, (req, res) => {
  const { userId, lessonId, score } = req.body;
  const course = courses.find((c) => c.id === req.params.id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  if (!userId || !lessonId) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (!course.progress[userId]) {
    course.progress[userId] = {
      completedLessons: [],
      score: 0,
    };
  }

  if (!course.progress[userId].completedLessons.includes(lessonId)) {
    course.progress[userId].completedLessons.push(lessonId);
  }

  if (score !== undefined) {
    course.progress[userId].score = score;
  }

  res.json({ message: "Progress updated", progress: course.progress[userId] });
});

/**
 * GET /courses/:id/progress/:userId
 * Get user progress
 */
app.get("/courses/:id/progress/:userId", auth, (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  const userProgress = course.progress[req.params.userId];

  if (!userProgress) {
    return res.status(404).json({ error: "No progress found for user" });
  }

  res.json(userProgress);
});

app.listen(5001, () => {
  console.log("INDEX.JS LOADED");
  console.log("Backend running on http://localhost:5001");
});


