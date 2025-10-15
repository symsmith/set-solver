<script lang="ts">
	import { resolve } from '$app/paths';
	import { signIn } from '$lib/api/auth.remote';
	import Form from '$lib/client/form/Form.svelte';
	import FormCard from '$lib/client/form/FormCard.svelte';
	import { signinFormSchema } from '$lib/shared/schemas/auth';
</script>

<FormCard>
	<h1>Welcome back!</h1>
	<Form form={signIn} schema={signinFormSchema}>
		<fieldset>
			<label for="email">
				Email address
				<input {...signIn.fields.email.as('email')} id="email" />
				<small>{signIn.fields.email.issues()?.[0]?.message}</small>
			</label>
			<label for="password">
				Password
				<input {...signIn.fields._password.as('password')} id="password" />
				<small>{signIn.fields._password.issues()?.[0]?.message}</small>
			</label>
		</fieldset>
		<div class="buttons">
			<button>Sign in</button><span>or <a href={resolve('/signup')}>sign up</a></span>
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
