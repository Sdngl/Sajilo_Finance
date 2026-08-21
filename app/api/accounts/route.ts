import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AccountModel } from "@/lib/models/Account";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }
    const accounts = await AccountModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: accounts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, data: { ...body, _id: "local-" + Date.now() } });
    }
    const newAcc = await AccountModel.create(body);
    return NextResponse.json({ success: true, data: newAcc }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
