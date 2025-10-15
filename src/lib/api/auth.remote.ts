import { resolve } from '$app/paths';
import { form, getRequestEvent, query } from '$app/server';
import { minDelay } from '$lib/api/utils';
import { auth } from '$lib/server/auth';
import { signinFormSchema, signupFormSchema } from '$lib/shared/schemas/auth';
import { redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth';

export const signup = form(
	signupFormSchema,
	minDelay(async (body) => {
		try {
			await auth.api.signUpEmail({ body: { ...body, name: body.email, password: body._password } });
		} catch (e) {
			if (e instanceof APIError) {
				return { error: e.message };
			} else {
				console.log(e);
				return { error: 'An error occured while signing up' };
			}
		}
	})
);

export const signin = form(signinFormSchema, async (body) => {
	try {
		await auth.api.signInEmail({ body: { ...body, password: body._password } });
	} catch (e) {
		console.log(e);
		return { error: 'An error occured while signing in' };
	}
});

export const signout = form(async () => {
	await auth.api.signOut({ headers: getRequestEvent().request.headers });
});

export const getUser = query(async () => {
	return getRequestEvent().locals.user;
});

export const needsAuth = query(async () => {
	if (!(await getUser())) {
		redirect(307, resolve('/signin'));
	}
});

export const needsAnon = query(async () => {
	if (await getUser()) {
		redirect(307, resolve('/'));
	}
});
