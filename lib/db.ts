/**
 * lib/db.ts
 * Re-exports the database connection utilities from dbConnect.ts
 * This file exists so API routes can import from "@/lib/db"
 */
export { connectDB, connectToDatabase } from "./dbConnect";
