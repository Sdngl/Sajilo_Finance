import mongoose, { Schema, model, models } from "mongoose";

export interface INotification {
  userId?: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, default: "default-user" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "success", "warning", "error"], default: "info" },
    read: { type: Boolean, default: false },
    link: { type: String },
  },
  { timestamps: true }
);

export const NotificationModel =
  models.Notification || model<INotification>("Notification", NotificationSchema);
