import mongoose, { Document, Schema } from "mongoose";

export interface IBusiness extends Document {
  owner: mongoose.Types.ObjectId;

  name: string;
  description?: string;

  category: string;

  phone?: string;
  address?: string;
  logo?: string;

  createdAt: Date;
  updatedAt: Date;
}

const businessSchema = new Schema<IBusiness>(
  {
    owner: {
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

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Business =
  mongoose.models.Business ||
  mongoose.model<IBusiness>("Business", businessSchema);

export default Business;