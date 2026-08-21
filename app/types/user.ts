export type UserRole = "USER" | "ADMIN";

export type AccountType = "PERSONAL" | "BUSINESS";

export interface IUser {
  _id: string;

  firebaseUid: string;

  name: string;
  email: string;
  phone?: string;
  profileImage?: string;

  role: UserRole;
  accountType: AccountType;

  createdAt: Date;
  updatedAt: Date;
}