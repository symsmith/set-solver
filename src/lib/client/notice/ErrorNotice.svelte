<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<article>
	{@render children()}
</article>

<style>
	article {
		&:empty {
			display: none;
		}

		color: var(--pico-form-element-invalid-focus-color);
		border: 1px solid var(--pico-form-element-invalid-focus-color);
		background-image: var(--pico-icon-invalid);
		background-position: center right 0.75rem;
		background-size: 1rem auto;
		background-repeat: no-repeat;
	}
</style>
