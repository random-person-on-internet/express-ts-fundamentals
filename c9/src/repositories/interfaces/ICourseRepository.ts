import { Course } from "../../models/Course.model";

export interface ICourseRepository {
  findAll(): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  save(course: Course): Promise<void>;
  enrollStudent(courseId: string, studentId: string): Promise<void>;
  findByStudentId(studentId: string): Promise<Course[]>;
}
