import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/database';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	plugins: [sveltekitCookies(getRequestEvent)],
	emailAndPassword: { enabled: true, requireEmailVerification: false }
});
