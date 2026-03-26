import { Pool } from 'pg';

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

let pool;
let initPromise;

function getPool() {
  if (!connectionString) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }

  return pool;
}

export function hasDatabaseConfig() {
  return Boolean(connectionString);
}

export async function initDatabase() {
  const db = getPool();

  if (!db) {
    throw new Error('Missing Postgres connection string. Set POSTGRES_URL or DATABASE_URL.');
  }

  if (!initPromise) {
    initPromise = db.query(`
      CREATE TABLE IF NOT EXISTS demo_requests (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        name TEXT NOT NULL,
        org TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        designation TEXT,
        use_case TEXT,
        location TEXT,
        timeline TEXT,
        message TEXT,
        org_type TEXT
      );

      CREATE TABLE IF NOT EXISTS job_applications (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        role TEXT NOT NULL,
        domain TEXT,
        experience TEXT,
        message TEXT,
        portfolio TEXT
      );
    `);
  }

  await initPromise;
  return db;
}

export async function saveDemoRequest(payload) {
  const db = await initDatabase();

  await db.query(
    `
      INSERT INTO demo_requests
        (name, org, email, phone, designation, use_case, location, timeline, message, org_type)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
    [
      payload.name,
      payload.org,
      payload.email,
      payload.phone || null,
      payload.designation || null,
      payload.useCase || null,
      payload.location || null,
      payload.timeline || null,
      payload.message || null,
      payload.orgType || null,
    ]
  );
}

export async function saveJobApplication(payload) {
  const db = await initDatabase();

  await db.query(
    `
      INSERT INTO job_applications
        (name, email, phone, role, domain, experience, message, portfolio)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [
      payload.name,
      payload.email,
      payload.phone || null,
      payload.role,
      payload.domain || null,
      payload.experience || null,
      payload.message || null,
      payload.portfolio || null,
    ]
  );
}
