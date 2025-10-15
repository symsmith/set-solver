import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/database/schema';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(env.DATABASE_URL);

export const db = drizzle(client, { schema, casing: 'snake_case' });
