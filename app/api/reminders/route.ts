import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ReminderModel } from "@/lib/models/Reminder";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: true, data: [] });
    const reminders = await ReminderModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: reminders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({
        success: true,
        data: { ...body, _id: "local-" + Date.now() },
      });
    }
    const reminder = await ReminderModel.create(body);
    return NextResponse.json(
      { success: true, data: reminder },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: true });
    await ReminderModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
