export interface ILearningProgress {
  _id: string;

  user: string;

  lessonId: string;

  progress: number;
  completed: boolean;

  quizScore?: number;

  lastAccessedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}