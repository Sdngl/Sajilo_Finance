/**
 * lib/services/smeProductService.ts
 * Server-side data fetching for SME Products (business inventory).
 */
import { connectToDatabase } from "../dbConnect";
import { SmeProductModel, ISmeProduct } from "../models/SmeProduct";

export async function getAllSmeProducts(): Promise<ISmeProduct[]> {
  const db = await connectToDatabase();
  if (!db) return [];
  return SmeProductModel.find({}).sort({ createdAt: -1 }).lean();
}

export async function createSmeProduct(data: Omit<ISmeProduct, "createdAt">) {
  const db = await connectToDatabase();
  if (!db) return null;
  return SmeProductModel.create(data);
}
