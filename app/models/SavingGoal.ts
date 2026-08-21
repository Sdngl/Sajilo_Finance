import mongoose, { Document, Schema } from "mongoose";

export interface ISavingsGoal extends Document {
  user: mongoose.Types.ObjectId;

  name: string;

  targetAmount: number;
  currentAmount: number;

  monthlyContribution: number;

  deadline: Date;

  status: "ACTIVE" | "COMPLETED" | "PAUSED";

  createdAt: Date;
  updatedAt: Date;
}

const savingsGoalSchema = new Schema<ISavingsGoal>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    targetAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    monthlyContribution: {
      type: Number,
      required: true,
      min: 0,
    },

    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "PAUSED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const SavingsGoal =
  mongoose.models.SavingsGoal ||
  mongoose.model<ISavingsGoal>("SavingsGoal", savingsGoalSchema);

export default SavingsGoal;