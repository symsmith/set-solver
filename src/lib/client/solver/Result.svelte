<script lang="ts">
	import Card from '$lib/client/solver/Card.svelte';
	import { getSets } from '$lib/client/solver/solve';
	import type { Card as CardType } from '$lib/shared/types/solver';

	const { cards: generatedCards, image }: { cards: CardType[]; image: string } = $props();

	let cards = $state(generatedCards);

	const sets = $derived(getSets(cards));
</script>

<article>
	<h1>Does this look right? <small>Click on the cards to fix issues</small></h1>
	<div class="comparison">
		<div class="image">
			<img src="data:image/png;base64,{image}" alt="" />
		</div>
		<div class="cards">
			{#each cards as card, i}
				<Card {card} onchange={(card) => (cards[i] = card)} />
			{/each}
		</div>
	</div>
</article>

<article class="result">
	<h1>
		{#if sets.length}
			{sets.length} set{sets.length > 1 ? 's' : ''} found
			<small>Click to highlight in the game</small>
		{:else}
			No set found
		{/if}
	</h1>
	{#if sets.length}
		<ul>
			{#each sets as set}
				<li>
					{#each set.sort((a, b) => a.count - b.count) as card}
						<Card {card} />
					{/each}
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	h1 small {
		font-size: 1rem;
		font-weight: normal;
		color: var(--pico-secondary);
	}

	.comparison {
		display: flex;
		flex-wrap: wrap;
		gap: var(--pico-spacing);

		.image {
			flex: 1;
			min-width: 300px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.cards {
			flex: 1;
			min-width: 300px;
			display: grid;
			gap: calc(var(--pico-spacing) / 2);
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}
	}

	.result h1:not(:has(+ *)) {
		margin: 0;
	}

	.result ul {
		display: grid;
		gap: var(--pico-spacing);
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

		li {
			display: grid;
			grid-template-columns: repeat(3, 100px);
			gap: calc(var(--pico-spacing) / 2);
		}
	}
</style>
