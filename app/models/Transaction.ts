import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  business?: mongoose.Types.ObjectId;

  type: "INCOME" | "EXPENSE" | "SALE" | "PURCHASE" | "PAYMENT" | "TRANSFER";

  category:
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

  description: string;
  amount: number;

  paymentMethod?: "CASH" | "QR" | "WALLET" | "BANK" | "CARD";

  customerName?: string;
  customerPhone?: string;

  paidAmount?: number;
  dueAmount?: number;

  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      index: true,
    },

    type: {
      type: String,
      enum: [
        "INCOME",
        "EXPENSE",
        "SALE",
        "PURCHASE",
        "PAYMENT",
        "TRANSFER",
      ],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "FOOD",
        "SHOPPING",
        "UTILITIES",
        "SALARY",
        "TRANSFER",
        "EDUCATION",
        "HEALTH",
        "TRANSPORT",
        "ENTERTAINMENT",
        "OTHER",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "QR", "WALLET", "BANK", "CARD"],
    },

    customerName: {
      type: String,
      trim: true,
    },

    customerPhone: {
      type: String,
      trim: true,
    },

    paidAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    dueAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED", "CANCELLED"],
      default: "COMPLETED",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;