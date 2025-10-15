<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<article>
	{@render children()}
</article>

<style>
	article {
		max-width: 25rem;
		margin: 0 auto;
	}
</style>
