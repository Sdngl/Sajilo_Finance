import mongoose, { Schema, model, models } from "mongoose";

export interface IFraudCheck {
  userId?: string;
  amount: number;
  recipient?: string;
  paymentMethod: "QR" | "Wallet" | "Bank Transfer" | "Cash" | "Card";
  message?: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskReasons: string[];
  recommendation: string;
  createdAt?: Date;
}

const FraudCheckSchema = new Schema<IFraudCheck>(
  {
    userId: { type: String, default: "default-user" },
    amount: { type: Number, required: true, min: 0 },
    recipient: { type: String, trim: true },
    paymentMethod: {
      type: String,
      enum: ["QR", "Wallet", "Bank Transfer", "Cash", "Card"],
      required: true,
    },
    message: { type: String, trim: true },
    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },
    riskReasons: { type: [String], default: [] },
    recommendation: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const FraudCheckModel =
  models.FraudCheck || model<IFraudCheck>("FraudCheck", FraudCheckSchema);
