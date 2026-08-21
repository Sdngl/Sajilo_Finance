/**
 * lib/services/accountService.ts
 * Server-side data fetching for Account data.
 * Used by API routes and server components.
 */
import { connectToDatabase } from "../dbConnect";
import { AccountModel, IAccount } from "../models/Account";

export async function getAllAccounts(): Promise<IAccount[]> {
  const db = await connectToDatabase();
  if (!db) return [];
  return AccountModel.find({}).sort({ createdAt: -1 }).lean();
}

export async function createAccount(data: Omit<IAccount, "createdAt">) {
  const db = await connectToDatabase();
  if (!db) return null;
  return AccountModel.create(data);
}

export async function updateAccountBalance(bankName: string, delta: number) {
  const db = await connectToDatabase();
  if (!db) return null;
  return AccountModel.updateOne(
    { bankName: new RegExp(`^${bankName}$`, "i") },
    { $inc: { balance: delta } }
  );
}
