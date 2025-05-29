import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";

export class CourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async enroll(
    courseId: string,
    studentId: string
  ): Promise<{ message: string }> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new Error(`Course with id ${courseId} not found`);
    if (course.students.length >= course.capacity) {
      throw new Error(`Course with id ${courseId} is full`);
    }
    await this.courseRepository.enrollStudent(courseId, studentId);
    return { message: "Enrollment successful" };
  }
}
