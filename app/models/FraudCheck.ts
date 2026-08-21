import mongoose, { Document, Schema } from "mongoose";

export interface IFraudCheck extends Document {
  user: mongoose.Types.ObjectId;

  amount: number;
  recipient?: string;
  paymentMethod: "QR" | "WALLET" | "BANK" | "CARD" | "CASH";

  message?: string;

  riskLevel: "LOW" | "MEDIUM" | "HIGH";

  riskReasons: string[];

  recommendation: string;

  createdAt: Date;
  updatedAt: Date;
}

const fraudCheckSchema = new Schema<IFraudCheck>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    recipient: {
      type: String,
      trim: true,
    },

    paymentMethod: {
      type: String,
      enum: ["QR", "WALLET", "BANK", "CARD", "CASH"],
      required: true,
    },

    message: {
      type: String,
      trim: true,
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    riskReasons: {
      type: [String],
      default: [],
    },

    recommendation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FraudCheck =
  mongoose.models.FraudCheck ||
  mongoose.model<IFraudCheck>("FraudCheck", fraudCheckSchema);

export default FraudCheck;