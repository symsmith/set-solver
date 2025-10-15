import * as v from 'valibot';

const usernameSchema = v.pipe(v.string(), v.nonEmpty('Username is required'));

const emailSchema = v.pipe(
	v.string(),
	v.nonEmpty('Email is required'),
	v.email('Must be a valid email address')
);

const passwordSchema = v.pipe(
	v.string(),
	v.minLength(8, 'Password must be at least 8 characters'),
	v.regex(/[a-z]/, 'Password must include at least one lowercase letter (a-z)'),
	v.regex(/[A-Z]/, 'Password must include at least one uppercase letter (A-Z)'),
	v.regex(/[0-9]/, 'Password must include at least one number (0-9)')
);

const signupFormSchemaBeforePasswordValidation = {
	email: emailSchema,
	_password: passwordSchema,
	_passwordConfirmation: v.string()
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

const updateUserFormSchemaBeforePasswordValidation = {
	name: usernameSchema,
	email: emailSchema,
	_currentPassword: v.string(),
	_newPassword: v.union([passwordSchema, v.literal('')]),
	_passwordConfirmation: v.string()
};

export const updateUserFormSchema = v.pipe(
	v.object(updateUserFormSchemaBeforePasswordValidation),
	v.transform((input) => ({
		...input,
		_currentPassword:
			input._newPassword !== ''
				? input._currentPassword !== ''
					? input._currentPassword
					: null
				: '',
		_passwordConfirmation:
			input._newPassword !== '' ? input._newPassword === input._passwordConfirmation : true
	})),
	v.object({
		...updateUserFormSchemaBeforePasswordValidation,
		_currentPassword: v.string('Current password is required to update the password'),
		_passwordConfirmation: v.literal(true, 'Password confirmation is not equal to the password')
	})
);
