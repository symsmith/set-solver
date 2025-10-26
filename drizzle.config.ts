import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/database/schema.ts',
	out: './src/lib/server/database/migrations',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_TOKEN!
	},
	verbose: true,
	strict: true,
	casing: 'snake_case'
});
