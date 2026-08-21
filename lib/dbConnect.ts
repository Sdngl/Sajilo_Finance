/**
 * lib/dbConnect.ts
 * MongoDB connection utility for Sajilo Finance.
 * Uses a global cache to avoid creating multiple connections in Next.js dev mode.
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.__mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.__mongooseCache) {
  global.__mongooseCache = cached;
}

/**
 * Connect to MongoDB.
 * Returns the mongoose instance on success, or null if no URI is configured
 * (allows the app to run gracefully without a DB connection).
 */
export async function connectDB(): Promise<typeof mongoose | null> {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    console.warn(
      "[dbConnect] MONGODB_URI / MONGO_URI is not set. " +
        "Running without a database connection."
    );
    return null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

/** Alias kept for backward compatibility with any code using `connectToDatabase`. */
export const connectToDatabase = connectDB;
