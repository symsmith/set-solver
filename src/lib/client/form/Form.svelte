<script lang="ts" generics="Input extends RemoteFormInput, SchemaOutput">
	import ErrorNotice from '$lib/client/notice/ErrorNotice.svelte';
	import SuccessNotice from '$lib/client/notice/SuccessNotice.svelte';
	import type { RemoteFormReturn } from '$lib/shared/types/remote';
	import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit';
	import type { StandardSchemaV1 } from 'better-auth';
	import type { Snippet } from 'svelte';

	const {
		form,
		schema,
		resetOnSuccess,
		children
	}: {
		form: RemoteForm<Input, RemoteFormReturn>;
		schema: StandardSchemaV1<Input, SchemaOutput>;
		resetOnSuccess?: boolean;
		children: Snippet;
	} = $props();
</script>

<form
	{...form.preflight(schema).enhance(async ({ submit, form }) => {
		await submit();
		if (resetOnSuccess) {
			form.reset();
		}
	})}
	enctype="multipart/form-data"
>
	<ErrorNotice>
		{form.result?.error}
	</ErrorNotice>
	<SuccessNotice>
		{form.result?.success ? 'Success!' : ''}
	</SuccessNotice>
	{@render children()}
</form>
