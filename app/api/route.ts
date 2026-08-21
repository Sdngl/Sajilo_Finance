// app/api/db-check/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/dbConnect";

export async function GET() {
  try {
    const conn = await connectDB();

    // 1. Check if the connection instance exists
    if (!conn) {
      return NextResponse.json(
        {
          status: "disconnected",
          message: "No connection instance returned. Check MONGODB_URI in .env.local",
        },
        { status: 500 }
      );
    }

    // 2. Read Mongoose connection state
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const state = mongoose.connection.readyState;
    const statesMap: Record<number, string> = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    if (state !== 1) {
      return NextResponse.json(
        {
          status: statesMap[state] || "unknown",
          message: "Database is not currently in a connected state.",
        },
        { status: 503 }
      );
    }

    // 3. Ping the database directly to confirm active I/O capability
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().ping();
    }

    return NextResponse.json(
      {
        status: "healthy",
        connected: true,
        databaseName: mongoose.connection.name,
        host: mongoose.connection.host,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        connected: false,
        message: error?.message || "Failed to establish or verify database connection.",
      },
      { status: 500 }
    );
  }
}