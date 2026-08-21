import mongoose, { Schema, model, models } from "mongoose";

export interface ISavingGoal {
  userId?: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  monthly: string;
  category?: string;
  createdAt?: Date;
}

const SavingGoalSchema = new Schema<ISavingGoal>(
  {
    userId: { type: String, default: "default-user" },
    name: { type: String, required: true },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    deadline: { type: String, required: true },
    monthly: { type: String, default: "Rs. 0" },
    category: { type: String, default: "Emergency Fund" },
  },
  { timestamps: true }
);

export const SavingGoalModel =
  models.SavingGoal || model<ISavingGoal>("SavingGoal", SavingGoalSchema);
