/**
 * app/api/savings/[id]/route.ts
 * PATCH route to deposit funds into a specific savings goal.
 */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SavingGoalModel } from "@/lib/models/SavingGoal";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json(
        { success: false, error: "Valid amount is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, data: null });
    }

    const updated = await SavingGoalModel.findByIdAndUpdate(
      params.id,
      { $inc: { current: Number(amount) } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Goal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
