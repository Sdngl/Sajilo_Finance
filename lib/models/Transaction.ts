import mongoose, { Schema, model, models } from "mongoose";

export interface ITransaction {
  userId?: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: "Income" | "Expense";
  accountName: string;
  status: string;
  createdAt?: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, default: "default-user" },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["Income", "Expense"], required: true },
    accountName: { type: String, required: true },
    status: { type: String, default: "Completed" },
  },
  { timestamps: true }
);

export const TransactionModel =
  models.Transaction || model<ITransaction>("Transaction", TransactionSchema);
