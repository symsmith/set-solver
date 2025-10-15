import * as v from 'valibot';

const emailSchema = v.pipe(
	v.string(),
	v.nonEmpty('Email is required'),
	v.email('Must be a valid email address')
);

const signupFormSchemaBeforePasswordValidation = {
	email: emailSchema,
	_password: v.pipe(
		v.string(),
		v.minLength(8, 'Password must be at least 8 characters'),
		v.regex(/[a-z]/, 'Password must include at least one lowercase letter (a-z)'),
		v.regex(/[A-Z]/, 'Password must include at least one uppercase letter (A-Z)'),
		v.regex(/[0-9]/, 'Password must include at least one number (0-9)')
	),
	_passwordConfirmation: v.pipe(v.string())
};

export const signupFormSchema = v.pipe(
	v.object(signupFormSchemaBeforePasswordValidation),
	v.transform((input) => ({
		...input,
		_passwordConfirmation: input._password === input._passwordConfirmation
	})),
	v.object({
		...signupFormSchemaBeforePasswordValidation,
		_passwordConfirmation: v.literal(true, 'Password confirmation is not equal to the password')
	})
);

export const signinFormSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Email is required'),
		v.email('Must be a valid email address')
	),
	_password: v.pipe(v.string(), v.nonEmpty('Password is required'))
});
