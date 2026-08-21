export type SavingsGoalStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "PAUSED";

export interface ISavingsGoal {
  _id: string;

  user: string;

  name: string;

  targetAmount: number;
  currentAmount: number;

  monthlyContribution: number;

  deadline: Date;

  status: SavingsGoalStatus;

  createdAt: Date;
  updatedAt: Date;
}