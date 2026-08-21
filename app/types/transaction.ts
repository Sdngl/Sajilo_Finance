import type { ObjectId } from "mongoose";

export type TransactionType =
  | "INCOME"
  | "EXPENSE"
  | "SALE"
  | "PURCHASE"
  | "PAYMENT"
  | "TRANSFER";

export type TransactionCategory =
  | "FOOD"
  | "SHOPPING"
  | "UTILITIES"
  | "SALARY"
  | "TRANSFER"
  | "EDUCATION"
  | "HEALTH"
  | "TRANSPORT"
  | "ENTERTAINMENT"
  | "OTHER";

export type PaymentMethod =
  | "CASH"
  | "QR"
  | "WALLET"
  | "BANK"
  | "CARD";

export type TransactionStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export interface ITransaction {
  _id: string;

  user: ObjectId;
  business?: ObjectId;

  type: TransactionType;
  category: TransactionCategory;

  description: string;
  amount: number;

  paymentMethod?: PaymentMethod;

  customerName?: string;
  customerPhone?: string;

  paidAmount?: number;
  dueAmount?: number;

  status: TransactionStatus;

  createdAt: Date;
  updatedAt: Date;
}