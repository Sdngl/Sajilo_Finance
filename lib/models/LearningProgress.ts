import mongoose, { Schema, model, models } from "mongoose";

export interface ILearningProgress {
  userId?: string;
  lessonId: string;
  lessonTitle: string;
  tag: string;
  durationMinutes: number;
  progress: number;   // 0 – 100
  completed: boolean;
  createdAt?: Date;
}

const LearningProgressSchema = new Schema<ILearningProgress>(
  {
    userId: { type: String, default: "default-user" },
    lessonId: { type: String, required: true },
    lessonTitle: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const LearningProgressModel =
  models.LearningProgress ||
  model<ILearningProgress>("LearningProgress", LearningProgressSchema);
