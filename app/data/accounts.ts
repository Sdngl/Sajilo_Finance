/**
 * app/data/accounts.ts
 * Fake seed data for the Account collection.
 * Matches IAccount from lib/models/Account.ts
 */

export const seedAccounts = [
  {
    userId: "default-user",
    type: "Bank Account" as const,
    bankName: "Prabhu Bank",
    holderName: "Navin Ayer",
    accountNumber: "PRB-1023456789",
    balance: 125000,
  },
  {
    userId: "default-user",
    type: "Digital Wallet" as const,
    bankName: "eSewa",
    holderName: "Navin Ayer",
    accountNumber: "9841234567",
    balance: 8500,
  },
  {
    userId: "default-user",
    type: "Digital Wallet" as const,
    bankName: "Khalti",
    holderName: "Navin Ayer",
    accountNumber: "9812345678",
    balance: 3200,
  },
  {
    userId: "default-user",
    type: "Cash" as const,
    bankName: "Cash in Hand",
    holderName: "Navin Ayer",
    accountNumber: "CASH-001",
    balance: 12000,
  },
];
