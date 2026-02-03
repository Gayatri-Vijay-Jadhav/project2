
export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  interests: string[];
  enrolledCourses: string[]; // Course IDs
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  category: string;
  rating: number;
  studentsCount: number;
  duration: string;
  thumbnail: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  isCompleted: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  lastAccessed: string;
}

export interface Rating {
  id: string;
  userId: string;
  courseId: string;
  score: number;
  comment: string;
}
