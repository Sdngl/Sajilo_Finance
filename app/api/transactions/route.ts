import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { TransactionModel } from "@/lib/models/Transaction";
import { AccountModel } from "@/lib/models/Account";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }
    const txs = await TransactionModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: txs });
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
    const newTx = await TransactionModel.create(body);

    // Update account balance in MongoDB
    if (body.accountName && body.amount) {
      const delta = body.type === "Income" ? body.amount : -body.amount;
      await AccountModel.updateOne(
        { bankName: new RegExp(`^${body.accountName}$`, "i") },
        { $inc: { balance: delta } }
      );
    }

    return NextResponse.json({ success: true, data: newTx }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
