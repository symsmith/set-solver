<script lang="ts">
	import { getUser, needsAuth, updateUser } from '$lib/api/auth.remote';
	import Form from '$lib/client/form/Form.svelte';
	import FormCard from '$lib/client/form/FormCard.svelte';
	import { updateUserFormSchema } from '$lib/shared/schemas/auth';

	await needsAuth();
	const user = $derived((await getUser())!);
</script>

<FormCard>
	<h1>Update your info</h1>
	<Form form={updateUser} schema={updateUserFormSchema}>
		<fieldset>
			<label for="name">
				Username
				<input {...updateUser.fields.name.as('text')} id="name" value={user.name} />
				<small>{updateUser.fields.name.issues()?.[0]?.message}</small>
			</label>
			<label for="email">
				Email address
				<input {...updateUser.fields.email.as('email')} id="email" value={user.email} />
				<small>{updateUser.fields.email.issues()?.[0]?.message}</small>
			</label>
			<label for="currentPassword">
				Current password
				<input {...updateUser.fields._currentPassword.as('password')} id="currentPassword" />
				<small>{updateUser.fields._currentPassword.issues()?.[0]?.message}</small>
			</label>
			<label for="newPassword">
				<span
					data-tooltip="At least 8 characters, including one lowercase and one uppercase letter and one digit."
				>
					New password
				</span>
				<input {...updateUser.fields._newPassword.as('password')} id="newPassword" />
				<small>{updateUser.fields._newPassword.issues()?.[0]?.message}</small>
			</label>
			<label for="passwordConfirmation">
				Password confirmation
				<input
					{...updateUser.fields._passwordConfirmation.as('password')}
					id="passwordConfirmation"
				/>
				<small>{updateUser.fields._passwordConfirmation.issues()?.[0]?.message}</small>
			</label>
		</fieldset>
		<button aria-busy={!!updateUser.pending}>Update</button>
	</Form>
</FormCard>
