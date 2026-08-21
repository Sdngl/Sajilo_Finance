/**
 * app/data/reminders.ts
 * Fake seed data for the Reminder collection.
 * Matches IReminder from lib/models/Reminder.ts
 */

export const seedReminders = [
  {
    userId: "default-user",
    title: "Payment for raw material supply",
    amount: 18000,
    dueDate: "Bhadau 30",
    type: "Give" as const,
    partyName: "Himalayan Bakery Suppliers",
  },
  {
    userId: "default-user",
    title: "Outstanding invoice – website project",
    amount: 25000,
    dueDate: "Ashoj 5",
    type: "Receive" as const,
    partyName: "Nepal Tourism Board",
  },
  {
    userId: "default-user",
    title: "Shared car rental – Dashain trip",
    amount: 4500,
    dueDate: "Bhadau 28",
    type: "Receive" as const,
    partyName: "Suman Karki",
  },
  {
    userId: "default-user",
    title: "Monthly shop rent",
    amount: 15000,
    dueDate: "Ashoj 1",
    type: "Give" as const,
    partyName: "Thamel Property Management",
  },
];
