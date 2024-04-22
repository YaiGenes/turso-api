import dotenv from 'dotenv';
dotenv.config();
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { posts } from './src/db/schema/posts.js';
import express from 'express';
import { log } from 'console';

const app = express();
app.use(express.json());

const client = createClient({ url: process.env.DB_HOST, authToken: process.env.DB_TOKEN });
const db = drizzle(client);
// POST endpoint to get all posts
app.post('/posts', async (req, res) => {
  try {
    const allPosts = await db.select().from(posts).all();
    res.json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});