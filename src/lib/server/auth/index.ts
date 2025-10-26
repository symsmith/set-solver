import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/database';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	plugins: [sveltekitCookies(getRequestEvent)],
	user: { changeEmail: { enabled: true } },
	emailAndPassword: { enabled: true, requireEmailVerification: false }
});
