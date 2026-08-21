/**
 * app/data/smeProducts.ts
 * Fake seed data for the SmeProduct collection.
 * Matches ISmeProduct from lib/models/SmeProduct.ts
 */

export const seedSmeProducts = [
  {
    userId: "default-user",
    name: "Arabica Coffee Beans (1 kg)",
    sku: "COF-001",
    category: "Beverages / Tea",
    stock: 24,
    price: "Rs. 1,200",
    numericPrice: 1200,
    status: "In Stock",
  },
  {
    userId: "default-user",
    name: "House Blend Coffee 250g",
    sku: "COF-004",
    category: "Beverages / Tea",
    stock: 6,
    price: "Rs. 650",
    numericPrice: 650,
    status: "Low Stock",
  },
  {
    userId: "default-user",
    name: "Cold Brew Bottle (500ml)",
    sku: "DRK-008",
    category: "Beverages / Tea",
    stock: 0,
    price: "Rs. 450",
    numericPrice: 450,
    status: "Out of Stock",
  },
  {
    userId: "default-user",
    name: "Ilam Orthodox Tea (100g)",
    sku: "TEA-012",
    category: "Beverages / Tea",
    stock: 50,
    price: "Rs. 380",
    numericPrice: 380,
    status: "In Stock",
  },
  {
    userId: "default-user",
    name: "Himalayan Honey Jar (500g)",
    sku: "HON-003",
    category: "Food & Bakery",
    stock: 15,
    price: "Rs. 950",
    numericPrice: 950,
    status: "In Stock",
  },
];
