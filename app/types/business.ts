export interface IBusiness {
  _id: string;

  owner: string;

  name: string;
  description?: string;

  category: string;

  phone?: string;
  address?: string;
  logo?: string;

  createdAt: Date;
  updatedAt: Date;
}