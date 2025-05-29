import { ICourseRepository } from "./interfaces/ICourseRepository";
import { Course } from "../models/Course.model";

export class DatabaseCourseRepository implements ICourseRepository {
  private courses: Course[] = [];

  async findAll(): Promise<Course[]> {
    console.log(`CourseModel.find({})`);
    return [];
  }

  async findById(id: string): Promise<Course | null> {
    console.log(`CouseModel.findById('${id}')`);
    return null;
  }

  async save(course: Course): Promise<void> {
    console.log(`
      CourseModel.findOneAndUpdate(
        { _id: "${course.id}" },
        {
          $set: {
            name: "${course.name}",
            capacity: ${course.capacity},
            students: ${JSON.stringify(course.students)}
          }
        },
        { upsert: true }
      )
    `);
  }

  async enrollStudent(courseId: string, studentId: string): Promise<void> {
    console.log(`
      CourseModel.updateOne(
        { _id: "${courseId}", students: { $ne: "${studentId}" } },
        { $push: { students: "${studentId}" } }
      )
    `);
  }

  async findByStudentId(studentId: string): Promise<Course[]> {
    console.log(`CourseModel.find({ students: "${studentId}" })`);
    return [];
  }
}
