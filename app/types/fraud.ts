export type PaymentMethod =
  | "QR"
  | "WALLET"
  | "BANK"
  | "CARD"
  | "CASH";

export type FraudRiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface IFraudCheck {
  _id: string;

  user: string;

  amount: number;
  recipient?: string;

  paymentMethod: PaymentMethod;

  message?: string;

  riskLevel: FraudRiskLevel;

  riskReasons: string[];

  recommendation: string;

  createdAt: Date;
  updatedAt: Date;
}