<script lang="ts">
	import { resolve } from '$app/paths';
	import { getUser, signout } from '$lib/api/auth.remote';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/assets/pico.fuchsia.min.css';

	let { children } = $props();

	const user = $derived(await getUser());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
	<nav>
		<ul><li><a href={resolve('/')}>Set Solver</a></li></ul>
		{#if user}
			<ul>
				<li>Signed in as <strong>{user.email}</strong></li>
				<li><form {...signout}><button class="secondary outline">Sign out</button></form></li>
			</ul>
		{:else}
			<ul>
				<li><a href={resolve('/signin')}>Sign in</a></li>
			</ul>
		{/if}
	</nav>

	<main>
		{@render children?.()}
	</main>
</div>

<style>
	nav {
		position: sticky;
		top: 0;
		background-color: var(--pico-background-color);
	}

	main {
		padding-block: var(--pico-spacing);
	}
</style>
