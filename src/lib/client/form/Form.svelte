<script lang="ts" generics="Input extends RemoteFormInput, SchemaOutput">
	import ErrorNotice from '$lib/client/notice/ErrorNotice.svelte';
	import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit';
	import type { StandardSchemaV1 } from 'better-auth';
	import type { Snippet } from 'svelte';

	const {
		form,
		schema,
		children
	}: {
		form: RemoteForm<Input, { error: string } | undefined>;
		schema: StandardSchemaV1<Input, SchemaOutput>;
		children: Snippet;
	} = $props();
</script>

<form {...form.preflight(schema)}>
	<ErrorNotice>
		{form.result?.error}
	</ErrorNotice>
	{@render children()}
</form>
