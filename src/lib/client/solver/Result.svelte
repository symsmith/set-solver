<script lang="ts">
	import Card from '$lib/client/solver/Card.svelte';
	import type { Card as CardType } from '$lib/shared/types/solver';

	const { cards, image }: { cards: CardType[]; image: string } = $props();

	const columns = $derived(
		(cards
			.filter((c) => c.row === 0)
			.sort((a, b) => a.column - b.column)
			.at(-1)?.column ?? 0) + 1
	);
	$inspect(columns);
</script>

<article>
	<h1>Does this look right?</h1>
	<div class="comparison">
		<div class="image">
			<img src="data:image/png;base64,{image}" alt="" />
		</div>
		<div
			class="cards"
			style="grid-template-columns:{new Array(columns)
				.fill(0)
				.map(() => '1fr')
				.join(' ')}"
		>
			{#each cards as card (`${card.row}-${card.column}`)}
				<Card {card} />
			{/each}
		</div>
	</div>
</article>

<style>
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
		}
	}
</style>
