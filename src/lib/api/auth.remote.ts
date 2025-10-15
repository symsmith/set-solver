import { resolve } from '$app/paths';
import { form, getRequestEvent, query } from '$app/server';
import { baseForm, getHeaders, minDelay } from '$lib/api/utils';
import { auth } from '$lib/server/auth';
import { signinFormSchema, signupFormSchema, updateUserFormSchema } from '$lib/shared/schemas/auth';
import { redirect } from '@sveltejs/kit';

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
export const signUp = form(
	signupFormSchema,
	minDelay(
		baseForm(async (body) => {
			await needsAnon();
			await auth.api.signUpEmail({
				body: { ...body, name: body.email, password: body._password }
			});
		})
	)
);

export const signIn = form(
	signinFormSchema,
	baseForm(async (body) => {
		await needsAnon();
		await auth.api.signInEmail({ body: { ...body, password: body._password } });
	})
);

export const signOut = form(async () => {
	await auth.api.signOut({ headers: getHeaders() });
});

export const updateUser = form(
	updateUserFormSchema,
	minDelay(
		baseForm(async (body) => {
			await needsAuth();
			const user = (await getUser())!;

			// update username
			if (user.name !== body.name) {
				await auth.api.updateUser({
					body: { name: body.name },
					headers: getHeaders()
				});
			}

			// update email
			if (user.email !== body.email) {
				await auth.api.changeEmail({ body: { newEmail: body.email } });
			}

			// update password
			if (body._newPassword !== '') {
				await auth.api.changePassword({
					body: {
						currentPassword: body._currentPassword,
						newPassword: body._newPassword,
						revokeOtherSessions: true
					},
					headers: getHeaders()
				});
			}
		})
	)
);
