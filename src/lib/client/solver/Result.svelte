<script lang="ts">
	import Card from '$lib/client/solver/Card.svelte';
	import type { Card as CardType } from '$lib/shared/types/solver';

	const { cards: generatedCards, image }: { cards: CardType[]; image: string } = $props();

	let cards = $state(generatedCards);
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
</style>
