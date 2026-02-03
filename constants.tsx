
import { Course, User, UserRole } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced React Architecture',
    instructor: 'Dr. Sarah Smith',
    description: 'Learn to build scalable frontend systems with modern React patterns.',
    category: 'Computer Science',
    rating: 4.8,
    studentsCount: 1250,
    duration: '12h 30m',
    thumbnail: 'https://picsum.photos/seed/react/800/450',
    lessons: [
      { id: 'l1', title: 'Introduction to Atomic Design', videoUrl: 'https://example.com/v1', duration: '15:00', isCompleted: true },
      { id: 'l2', title: 'State Management with Hooks', videoUrl: 'https://example.com/v2', duration: '25:00', isCompleted: false },
    ]
  },
  {
    id: 'c2',
    title: 'Machine Learning Fundamentals',
    instructor: 'Prof. Alan Turing',
    description: 'A deep dive into supervised and unsupervised learning techniques.',
    category: 'Artificial Intelligence',
    rating: 4.9,
    studentsCount: 3400,
    duration: '20h 45m',
    thumbnail: 'https://picsum.photos/seed/ml/800/450',
    lessons: [
      { id: 'l3', title: 'Linear Regression Basics', videoUrl: 'https://example.com/v3', duration: '30:00', isCompleted: false },
    ]
  },
  {
    id: 'c3',
    title: 'Data Structures and Algorithms',
    instructor: 'Jane Doe',
    description: 'Master the core concepts of software engineering.',
    category: 'Computer Science',
    rating: 4.7,
    studentsCount: 8900,
    duration: '45h 00m',
    thumbnail: 'https://picsum.photos/seed/dsa/800/450',
    lessons: []
  },
  {
    id: 'c4',
    title: 'Full Stack Web Development',
    instructor: 'Mark Wilson',
    description: 'From HTML to Deployment: A complete career track.',
    category: 'Development',
    rating: 4.6,
    studentsCount: 5600,
    duration: '60h 00m',
    thumbnail: 'https://picsum.photos/seed/web/800/450',
    lessons: []
  },
  {
    id: 'c5',
    title: 'Cyber Security Essentials',
    instructor: 'Kevin Mitnick',
    description: 'Protect your digital assets with advanced security protocols.',
    category: 'Security',
    rating: 4.5,
    studentsCount: 2100,
    duration: '15h 20m',
    thumbnail: 'https://picsum.photos/seed/sec/800/450',
    lessons: []
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'John BCA Student',
  email: 'john@student.edu',
  role: UserRole.STUDENT,
  interests: ['React', 'Artificial Intelligence', 'Cyber Security'],
  enrolledCourses: ['c1', 'c2']
};
