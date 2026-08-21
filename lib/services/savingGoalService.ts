/**
 * lib/services/savingGoalService.ts
 * Server-side data fetching for Saving Goals.
 */
import { connectToDatabase } from "../dbConnect";
import { SavingGoalModel, ISavingGoal } from "../models/SavingGoal";

export async function getAllSavingGoals(): Promise<ISavingGoal[]> {
  const db = await connectToDatabase();
  if (!db) return [];
  return SavingGoalModel.find({}).sort({ createdAt: -1 }).lean();
}

export async function createSavingGoal(data: Omit<ISavingGoal, "createdAt">) {
  const db = await connectToDatabase();
  if (!db) return null;
  return SavingGoalModel.create(data);
}

export async function depositToGoal(goalId: string, amount: number) {
  const db = await connectToDatabase();
  if (!db) return null;
  return SavingGoalModel.findByIdAndUpdate(
    goalId,
    { $inc: { current: amount } },
    { new: true }
  );
}
