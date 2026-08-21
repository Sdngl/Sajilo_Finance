/**
 * app/data/learningProgress.ts
 * Fake seed data for the LearningProgress collection.
 * Matches ILearningProgress from lib/models/LearningProgress.ts
 */

export const seedLearningProgress = [
  {
    userId: "default-user",
    lessonId: "lesson-001",
    lessonTitle: "How to identify a fake payment request",
    tag: "Digital Payments",
    durationMinutes: 6,
    progress: 80,
    completed: false,
  },
  {
    userId: "default-user",
    lessonId: "lesson-002",
    lessonTitle: "Understanding compound savings",
    tag: "Saving Money",
    durationMinutes: 8,
    progress: 45,
    completed: false,
  },
  {
    userId: "default-user",
    lessonId: "lesson-003",
    lessonTitle: "How to create a monthly budget",
    tag: "Budgeting",
    durationMinutes: 5,
    progress: 100,
    completed: true,
  },
  {
    userId: "default-user",
    lessonId: "lesson-004",
    lessonTitle: "How QR payment scams work",
    tag: "Online Scams",
    durationMinutes: 7,
    progress: 20,
    completed: false,
  },
  {
    userId: "default-user",
    lessonId: "lesson-005",
    lessonTitle: "Introduction to ConnectIPS & banking",
    tag: "Digital Payments",
    durationMinutes: 10,
    progress: 0,
    completed: false,
  },
];
