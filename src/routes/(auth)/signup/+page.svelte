<script lang="ts">
	import { resolve } from '$app/paths';
	import { signUp } from '$lib/api/auth.remote';
	import Form from '$lib/client/form/Form.svelte';
	import FormCard from '$lib/client/form/FormCard.svelte';
	import { signupFormSchema } from '$lib/shared/schemas/auth';
</script>

<svelte:head>
	<title>Sign up - Set Solver</title>
</svelte:head>

<FormCard>
	<h1>Welcome!</h1>
	<Form form={signUp} schema={signupFormSchema}>
		<fieldset>
			<label for="email">
				Email address
				<input {...signUp.fields.email.as('email')} id="email" />
				<small>{signUp.fields.email.issues()?.[0]?.message}</small>
			</label>
			<label for="password">
				<span
					data-tooltip="At least 8 characters, including one lowercase and one uppercase letter and one digit."
				>
					Password
				</span>
				<input {...signUp.fields._password.as('password')} id="password" />
				<small>{signUp.fields._password.issues()?.[0]?.message}</small>
			</label>
			<label for="passwordConfirmation">
				Password confirmation
				<input {...signUp.fields._passwordConfirmation.as('password')} id="passwordConfirmation" />
				<small>{signUp.fields._passwordConfirmation.issues()?.[0]?.message}</small>
			</label>
		</fieldset>
		<div class="buttons">
			<button aria-busy={!!signUp.pending}>Sign up</button><span>
				or <a href={resolve('/signin')}>sign in</a></span
			>
		</div>
	</Form>
</FormCard>

<style>
	.buttons {
		display: flex;
		gap: var(--pico-spacing);
		align-items: center;
	}
</style>
