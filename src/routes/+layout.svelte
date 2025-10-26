<script lang="ts">
	import { resolve } from '$app/paths';
	import { getUser, signOut } from '$lib/api/auth.remote';
	import appleTouchIconPNG from '$lib/assets/apple-touch-icon.png';
	import favicon96PNG from '$lib/assets/favicon-96x96.png';
	import faviconICO from '$lib/assets/favicon.ico';
	import faviconSVG from '$lib/assets/favicon.svg';
	import '$lib/assets/pico.violet.min.css';

	let { children } = $props();

	const user = $derived(await getUser());
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon96PNG} sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href={faviconSVG} />
	<link rel="shortcut icon" href={faviconICO} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconPNG} />
	<meta name="apple-mobile-web-app-title" content="Set Solver" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<div class="container">
	<nav>
		<ul><li><a href={resolve('/')}>Set Solver</a></li></ul>
		{#if user}
			<ul>
				<li><a class="secondary" href={resolve('/profile')}>Profile</a></li>
				<li>
					<form {...signOut}>
						<button class="secondary outline">Sign out</button>
					</form>
				</li>
			</ul>
		{:else}
			<ul>
				<li>
					<a class="secondary outline" href={resolve('/signin')} role="button">Sign in</a>
				</li>
			</ul>
		{/if}
	</nav>

	<main>
		{@render children?.()}
	</main>
</div>

<style>
	nav {
		background-color: var(--pico-background-color);

		li a[role='button'] {
			display: table-cell;
		}
	}

	main {
		padding-block: var(--pico-spacing);
	}
</style>
