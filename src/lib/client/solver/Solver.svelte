<script>
	import { solve } from '$lib/api/solver.remote';
	import Form from '$lib/client/form/Form.svelte';
	import FormCard from '$lib/client/form/FormCard.svelte';
	import { solveFormSchema } from '$lib/shared/schemas/solver';
</script>

<FormCard>
	<h1>Upload your set</h1>
	<Form form={solve} schema={solveFormSchema} resetOnSuccess>
		<label for="image">
			Photo of the set
			<input {...solve.fields.image.as('file')} id="image" />
			<small>{solve.fields.image.issues()?.[0]?.message}</small>
		</label>
		<button aria-busy={!!solve.pending}>Solve</button>
	</Form>
</FormCard>

<style>
	input[type='file'][aria-invalid='true'] {
		--pico-form-element-invalid-focus-color: transparent;
		padding: calc(var(--pico-form-element-spacing-vertical) * 0.5) 0 !important;
		margin-bottom: calc(var(--pico-form-element-spacing-vertical) / 2) !important;
		margin-left: calc(var(--pico-outline-width) * -1) !important;
		padding-left: var(--pico-outline-width) !important;
	}
</style>
