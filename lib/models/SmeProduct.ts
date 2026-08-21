import mongoose, { Schema, model, models } from "mongoose";

export interface ISmeProduct {
  userId?: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  numericPrice: number;
  status: string;
  createdAt?: Date;
}

const SmeProductSchema = new Schema<ISmeProduct>(
  {
    userId: { type: String, default: "default-user" },
    name: { type: String, required: true },
    sku: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    price: { type: String, required: true },
    numericPrice: { type: Number, required: true },
    status: { type: String, default: "In Stock" },
  },
  { timestamps: true }
);

export const SmeProductModel =
  models.SmeProduct || model<ISmeProduct>("SmeProduct", SmeProductSchema);
