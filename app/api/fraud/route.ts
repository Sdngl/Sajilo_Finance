import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { FraudCheckModel } from "@/lib/models/FraudCheck";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: true, data: [] });
    const checks = await FraudCheckModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: checks });
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
    const check = await FraudCheckModel.create(body);
    return NextResponse.json({ success: true, data: check }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
