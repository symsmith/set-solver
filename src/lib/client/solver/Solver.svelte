<script>
	import { solve } from '$lib/api/solver.remote';
	import Form from '$lib/client/form/Form.svelte';
	import FormCard from '$lib/client/form/FormCard.svelte';
	import Result from '$lib/client/solver/Result.svelte';
	import { solveFormSchema } from '$lib/shared/schemas/solver';
</script>

{#if solve.result?.success}
	<Result cards={solve.result.success.cards} image={solve.result.success.image} />
{:else}
	<FormCard>
		<h1>Upload your game</h1>
		<Form form={solve} schema={solveFormSchema} resetOnSuccess>
			<input {...solve.fields.image.as('file')} />
			<small>{solve.fields.image.issues()?.[0]?.message}</small>
			<button aria-busy={!!solve.pending}>Check</button>
		</Form>
	</FormCard>
{/if}

<style>
	input[type='file'][aria-invalid='true'] {
		--pico-form-element-invalid-focus-color: transparent;
		padding: calc(var(--pico-form-element-spacing-vertical) * 0.5) 0 !important;
		margin-bottom: calc(var(--pico-form-element-spacing-vertical) / 2) !important;
		margin-left: calc(var(--pico-outline-width) * -1) !important;
		padding-left: var(--pico-outline-width) !important;
	}
</style>
