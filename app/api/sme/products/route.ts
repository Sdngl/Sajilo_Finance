import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SmeProductModel } from "@/lib/models/SmeProduct";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: true, data: [] });
    const products = await SmeProductModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: true, data: { ...body, _id: "local-" + Date.now() } });
    const product = await SmeProductModel.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
