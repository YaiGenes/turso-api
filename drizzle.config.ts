import type { Config } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: "./src/db/schema/posts.ts",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_HOST!,
    authToken: process.env.DB_TOKEN,
  },
  out: "./drizzle",
} satisfies Config;
