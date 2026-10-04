import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

let sql = null;
if (connectionString) {
  try {
    sql = neon(connectionString);
  } catch (err) {
    console.error('Neon client initialization error:', err);
  }
}

// In-memory fallback if database not configured yet
export const memoryStore = {
  messages: [],
  users: [
    { email: "jikul@jc.co.id", username: "jikul", password_hash: "japaneseculinary", name: "Member Circle", role: "circle_member" },
    { email: "jculinary@gmail.com", username: "jculinary", password_hash: "japaneseculinary", name: "Circle Admin", role: "circle_member" },
    { email: "jculinary06@gmail.com", username: "jculinary06", password_hash: "japaneseculinary", name: "Circle Lead", role: "circle_member" }
  ]
};

let dbInitialized = false;

export async function getDb() {
  if (!sql) return null;

  if (!dbInitialized) {
    try {
      // 1. Messages table
      await sql`
        CREATE TABLE IF NOT EXISTS messages (
          id BIGSERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          role VARCHAR(100) NOT NULL,
          tag VARCHAR(50) NOT NULL,
          content TEXT NOT NULL,
          time_str VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 2. Users table
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id BIGSERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          name VARCHAR(100),
          role VARCHAR(50) DEFAULT 'circle_member',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Seed default circle user
      await sql`
        INSERT INTO users (email, username, password_hash, name, role)
        VALUES ('jikul@jc.co.id', 'jikul', 'japaneseculinary', 'Member Circle', 'circle_member')
        ON CONFLICT (email) DO NOTHING;
      `;

      dbInitialized = true;
    } catch (e) {
      console.error('Database auto-initialization error:', e);
    }
  }

  return sql;
}
