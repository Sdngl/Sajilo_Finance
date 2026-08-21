import mongoose, { Document, Schema } from "mongoose";

export interface ILearningProgress extends Document {
  user: mongoose.Types.ObjectId;

  lessonId: string;

  progress: number;
  completed: boolean;

  quizScore?: number;

  lastAccessedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const learningProgressSchema = new Schema<ILearningProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    lessonId: {
      type: String,
      required: true,
      trim: true,
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    quizScore: {
      type: Number,
      min: 0,
    },

    lastAccessedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

learningProgressSchema.index(
  { user: 1, lessonId: 1 },
  { unique: true }
);

const LearningProgress =
  mongoose.models.LearningProgress ||
  mongoose.model<ILearningProgress>(
    "LearningProgress",
    learningProgressSchema
  );

export default LearningProgress;