<script lang="ts">
	import { resolve } from '$app/paths';
	import { signin } from '$lib/api/auth.remote';
	import Form from '$lib/client/form/Form.svelte';
	import FormCard from '$lib/client/form/FormCard.svelte';
	import { signinFormSchema } from '$lib/shared/schemas/auth';
</script>

<FormCard>
	<h1>Welcome back!</h1>
	<Form form={signin} schema={signinFormSchema}>
		<fieldset>
			<label for="email">
				Email address
				<input {...signin.fields.email.as('email')} id="email" />
				<small>{signin.fields.email.issues()?.[0]?.message}</small>
			</label>
			<label for="password">
				Password
				<input {...signin.fields._password.as('password')} id="password" />
				<small>{signin.fields._password.issues()?.[0]?.message}</small>
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
