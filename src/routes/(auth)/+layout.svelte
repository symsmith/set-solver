<script lang="ts">
	import { needsAnon } from '$lib/api/auth.remote';

	const { children } = $props();

	await needsAnon();
</script>

{@render children()}
