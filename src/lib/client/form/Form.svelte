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
		children
	}: {
		form: RemoteForm<Input, RemoteFormReturn>;
		schema: StandardSchemaV1<Input, SchemaOutput>;
		children: Snippet;
	} = $props();
</script>

<form {...form.preflight(schema).enhance(({ submit }) => submit())}>
	<ErrorNotice>
		{form.result?.error}
	</ErrorNotice>
	<SuccessNotice>
		{form.result?.success ? 'Success!' : ''}
	</SuccessNotice>
	{@render children()}
</form>
