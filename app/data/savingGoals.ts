/**
 * app/data/savingGoals.ts
 * Fake seed data for the SavingGoal collection.
 * Matches ISavingGoal from lib/models/SavingGoal.ts
 */

export const seedSavingGoals = [
  {
    userId: "default-user",
    name: "Emergency Safety Net",
    target: 100000,
    current: 35000,
    deadline: "Dec 2026",
    monthly: "Rs. 5,000",
    category: "Emergency Fund",
  },
  {
    userId: "default-user",
    name: "New Laptop (MacBook Air)",
    target: 120000,
    current: 45000,
    deadline: "Mar 2027",
    monthly: "Rs. 6,250",
    category: "Electronics",
  },
  {
    userId: "default-user",
    name: "Dashain & Tihar Budget",
    target: 80000,
    current: 20000,
    deadline: "Oct 2026",
    monthly: "Rs. 10,000",
    category: "Festivals",
  },
  {
    userId: "default-user",
    name: "Business Expansion Fund",
    target: 300000,
    current: 60000,
    deadline: "Jun 2027",
    monthly: "Rs. 20,000",
    category: "Business",
  },
];
