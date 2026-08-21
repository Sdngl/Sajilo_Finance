import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SavingGoalModel } from "@/lib/models/SavingGoal";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: true, data: [] });
    const goals = await SavingGoalModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: goals });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: true, data: { ...body, _id: "local-" + Date.now() } });
    const goal = await SavingGoalModel.create(body);
    return NextResponse.json({ success: true, data: goal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
