/**
 * app/data/fraudChecks.ts
 * Fake seed data for the FraudCheck collection.
 * Matches IFraudCheck from lib/models/FraudCheck.ts
 */

export const seedFraudChecks = [
  {
    userId: "default-user",
    amount: 5000,
    recipient: "Unknown QR Merchant",
    paymentMethod: "QR" as const,
    message: "Recipient was urging payment immediately and claimed prize money",
    riskLevel: "HIGH" as const,
    riskReasons: [
      "Unusual urgency from recipient",
      "Unverified QR merchant",
      "Prize/lottery claim attached",
    ],
    recommendation:
      "Do NOT send money. This transaction shows multiple red flags of a QR scam. Report to your bank.",
  },
  {
    userId: "default-user",
    amount: 12000,
    recipient: "Maya Trading Co.",
    paymentMethod: "Bank Transfer" as const,
    message: "Regular business payment to known supplier",
    riskLevel: "LOW" as const,
    riskReasons: [],
    recommendation:
      "Transaction appears safe. The recipient is a known business contact with no suspicious flags.",
  },
  {
    userId: "default-user",
    amount: 3500,
    recipient: "9801234567 (Unverified)",
    paymentMethod: "Wallet" as const,
    message: "Caller asked for OTP during transaction",
    riskLevel: "HIGH" as const,
    riskReasons: [
      "OTP requested by third party",
      "Unverified wallet number",
    ],
    recommendation:
      "STOP the transaction. Genuine eSewa/Khalti staff will never ask for your OTP. Possible phishing attempt.",
  },
  {
    userId: "default-user",
    amount: 800,
    recipient: "Suman Karki",
    paymentMethod: "QR" as const,
    message: "Splitting dinner bill at friend's restaurant",
    riskLevel: "LOW" as const,
    riskReasons: [],
    recommendation:
      "Low-risk social payment. Verify the merchant QR matches the business name before confirming.",
  },
];
