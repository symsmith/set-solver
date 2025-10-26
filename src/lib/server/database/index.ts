import { env } from '$env/dynamic/private';
import { DATABASE_URL } from '$env/static/private';
import * as schema from '$lib/server/database/schema';
import { drizzle } from 'drizzle-orm/libsql';

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const db = drizzle({
	connection: {
		url: DATABASE_URL!,
		authToken: env.DATABASE_TOKEN!
	},
	schema,
	casing: 'snake_case'
});
