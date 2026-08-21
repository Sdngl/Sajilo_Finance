/**
 * lib/services/transactionService.ts
 * Server-side data fetching for Transaction data.
 */
import { connectToDatabase } from "../dbConnect";
import { TransactionModel, ITransaction } from "../models/Transaction";

export async function getAllTransactions(): Promise<ITransaction[]> {
  const db = await connectToDatabase();
  if (!db) return [];
  return TransactionModel.find({}).sort({ createdAt: -1 }).lean();
}

export async function createTransaction(data: Omit<ITransaction, "createdAt">) {
  const db = await connectToDatabase();
  if (!db) return null;
  return TransactionModel.create(data);
}
