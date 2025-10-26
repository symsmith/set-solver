<script lang="ts">
	import { resolve } from '$app/paths';
	import { getUser } from '$lib/api/auth.remote';
	import Solver from '$lib/client/solver/Solver.svelte';

	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>Set Solver</title>
</svelte:head>

{#if user}
	<Solver />
{:else}
	<p>Please <a href={resolve('/signin')}>sign in</a> to use the app</p>
{/if}
