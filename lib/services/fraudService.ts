/**
 * lib/services/fraudService.ts
 * Server-side data fetching for Fraud Check history.
 */
import { connectToDatabase } from "../dbConnect";
import { FraudCheckModel, IFraudCheck } from "../models/FraudCheck";

export async function getFraudHistory(): Promise<IFraudCheck[]> {
  const db = await connectToDatabase();
  if (!db) return [];
  return FraudCheckModel.find({}).sort({ createdAt: -1 }).limit(20).lean();
}

export async function saveFraudCheck(data: Omit<IFraudCheck, "createdAt">) {
  const db = await connectToDatabase();
  if (!db) return null;
  return FraudCheckModel.create(data);
}
