import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// This is a placeholder for the database connection.
// Since the project explicitly forbids database usage, we won't throw an error here immediately
// to allow the app to build, but we will not export a valid connection if the env var is missing.
// The storage layer will use in-memory storage.

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy" 
});

// We export db to satisfy imports, but it shouldn't be used in this No-DB mode.
export const db = drizzle(pool, { schema });
