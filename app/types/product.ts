export type ProductStatus =
  | "IN_STOCK"
  | "LOW_STOCK"
  | "OUT_OF_STOCK";

export interface IProduct {
  _id: string;

  business: string;

  name: string;
  sku?: string;
  category?: string;

  price: number;
  stock: number;
  lowStockThreshold: number;

  status: ProductStatus;

  createdAt: Date;
  updatedAt: Date;
}