/**
 * app/api/seed/route.ts
 *
 * Development-only endpoint to seed fake data into MongoDB.
 * Call GET /api/seed to insert records into all collections
 * (only if each collection is empty — safe to call multiple times).
 *
 * Usage: visit http://localhost:3000/api/seed once after setting MONGODB_URI.
 */

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

// Models
import { AccountModel } from "@/lib/models/Account";
import { TransactionModel } from "@/lib/models/Transaction";
import { SavingGoalModel } from "@/lib/models/SavingGoal";
import { SmeProductModel } from "@/lib/models/SmeProduct";
import { ReminderModel } from "@/lib/models/Reminder";
import { FraudCheckModel } from "@/lib/models/FraudCheck";
import { LearningProgressModel } from "@/lib/models/LearningProgress";

// Seed data
import { seedAccounts } from "@/app/data/accounts";
import { seedTransactions } from "@/app/data/transactions";
import { seedSavingGoals } from "@/app/data/savingGoals";
import { seedSmeProducts } from "@/app/data/smeProducts";
import { seedReminders } from "@/app/data/reminders";
import { seedFraudChecks } from "@/app/data/fraudChecks";
import { seedLearningProgress } from "@/app/data/learningProgress";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No MongoDB connection available. Set MONGODB_URI in your .env.local file.",
        },
        { status: 503 }
      );
    }

    const results: Record<string, string> = {};

    // Accounts
    const accountCount = await AccountModel.countDocuments();
    if (accountCount === 0) {
      await AccountModel.insertMany(seedAccounts);
      results.accounts = `Inserted ${seedAccounts.length} records`;
    } else {
      results.accounts = `Skipped — ${accountCount} records already exist`;
    }

    // Transactions
    const txCount = await TransactionModel.countDocuments();
    if (txCount === 0) {
      await TransactionModel.insertMany(seedTransactions);
      results.transactions = `Inserted ${seedTransactions.length} records`;
    } else {
      results.transactions = `Skipped — ${txCount} records already exist`;
    }

    // Saving Goals
    const goalCount = await SavingGoalModel.countDocuments();
    if (goalCount === 0) {
      await SavingGoalModel.insertMany(seedSavingGoals);
      results.savingGoals = `Inserted ${seedSavingGoals.length} records`;
    } else {
      results.savingGoals = `Skipped — ${goalCount} records already exist`;
    }

    // SME Products
    const productCount = await SmeProductModel.countDocuments();
    if (productCount === 0) {
      await SmeProductModel.insertMany(seedSmeProducts);
      results.smeProducts = `Inserted ${seedSmeProducts.length} records`;
    } else {
      results.smeProducts = `Skipped — ${productCount} records already exist`;
    }

    // Reminders
    const reminderCount = await ReminderModel.countDocuments();
    if (reminderCount === 0) {
      await ReminderModel.insertMany(seedReminders);
      results.reminders = `Inserted ${seedReminders.length} records`;
    } else {
      results.reminders = `Skipped — ${reminderCount} records already exist`;
    }

    // Fraud Checks
    const fraudCount = await FraudCheckModel.countDocuments();
    if (fraudCount === 0) {
      await FraudCheckModel.insertMany(seedFraudChecks);
      results.fraudChecks = `Inserted ${seedFraudChecks.length} records`;
    } else {
      results.fraudChecks = `Skipped — ${fraudCount} records already exist`;
    }

    // Learning Progress
    const learningCount = await LearningProgressModel.countDocuments();
    if (learningCount === 0) {
      await LearningProgressModel.insertMany(seedLearningProgress);
      results.learningProgress = `Inserted ${seedLearningProgress.length} records`;
    } else {
      results.learningProgress = `Skipped — ${learningCount} records already exist`;
    }

    return NextResponse.json({
      success: true,
      message: "Seed completed successfully",
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
