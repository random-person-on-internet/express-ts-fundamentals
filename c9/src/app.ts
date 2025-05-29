import express from "express";

import { InMemoryCourseRepository } from "./repositories/InMemoryCourseRepository";
import { CourseService } from "./services/CourseSerice";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const courseRepository = new InMemoryCourseRepository();
const courseService = new CourseService(courseRepository);

app.post("/course/:id/enroll", async (req, res) => {
  try {
    const result = await courseService.enroll(
      req.params.id,
      req.body.studentId
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/students/:id/courses", async (req, res) => {
  const courses = await courseRepository.findByStudentId(req.params.id);
  res.status(200).json(courses);
});

app.get("/", async (req, res) => {
  res.send("Welcome to the Course Enrollment API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
