/**
 * lib/services/reminderService.ts
 * Server-side data fetching for Reminder data.
 */
import { connectToDatabase } from "../dbConnect";
import { ReminderModel, IReminder } from "../models/Reminder";

export async function getAllReminders(): Promise<IReminder[]> {
  const db = await connectToDatabase();
  if (!db) return [];
  return ReminderModel.find({}).sort({ createdAt: -1 }).lean();
}

export async function createReminder(data: Omit<IReminder, "createdAt">) {
  const db = await connectToDatabase();
  if (!db) return null;
  return ReminderModel.create(data);
}

export async function deleteReminder(id: string) {
  const db = await connectToDatabase();
  if (!db) return null;
  return ReminderModel.findByIdAndDelete(id);
}
