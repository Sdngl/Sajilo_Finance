import mongoose, { Schema, model, models } from "mongoose";

export interface IAccount {
  userId?: string;
  type: "Bank Account" | "Digital Wallet" | "Cash" | "Savings Account";
  bankName: string;
  holderName: string;
  accountNumber: string;
  balance: number;
  createdAt?: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: String, default: "default-user" },
    type: {
      type: String,
      enum: ["Bank Account", "Digital Wallet", "Cash", "Savings Account"],
      required: true,
    },
    bankName: { type: String, required: true },
    holderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const AccountModel = models.Account || model<IAccount>("Account", AccountSchema);
