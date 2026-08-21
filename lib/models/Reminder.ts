import mongoose, { Schema, model, models } from "mongoose";

export interface IReminder {
  userId?: string;
  title: string;
  amount: number;
  dueDate: string;
  type: "Receive" | "Give";
  partyName: string;
  createdAt?: Date;
}

const ReminderSchema = new Schema<IReminder>(
  {
    userId: { type: String, default: "default-user" },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true },
    type: { type: String, enum: ["Receive", "Give"], required: true },
    partyName: { type: String, required: true },
  },
  { timestamps: true }
);

export const ReminderModel =
  models.Reminder || model<IReminder>("Reminder", ReminderSchema);
