<script lang="ts">
	import Card from '$lib/client/solver/Card.svelte';
	import { getSolverContext } from '$lib/client/solver/context.svelte';
	import { findCard, getSets, isSameSet, isSetInCards, type Set } from '$lib/client/solver/solve';
	import type { Card as CardType } from '$lib/shared/types/solver';

	const { cards: generatedCards, image }: { cards: CardType[]; image: string } = $props();

	let cards = $state(generatedCards);
	let highlightedSet: Set | null = $state(null);

	const sets = $derived(getSets(cards));

	let context = getSolverContext();
</script>

<button
	type="button"
	class="secondary"
	onclick={() => {
		context.formId += 1;
	}}>Upload another game</button
>

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
				{@const isSelected = highlightedSet && isSameSet(set, highlightedSet)}
				<li>
					<button
						onclick={() => (highlightedSet = isSelected ? null : set)}
						data-selected={isSelected}
					>
						{#each set.sort((a, b) => a.count - b.count) as card}
							<Card {card} />
						{/each}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</article>

<article>
	<h1>Are all the cards there? <small>Click on the cards to fix issues</small></h1>
	<div class="comparison">
		<div class="image">
			<img src="data:image/png;base64,{image}" alt="The uploaded file" />
		</div>
		<div class="cards">
			{#each cards as card, i}
				{@const isHighlighted =
					!!highlightedSet &&
					isSetInCards(highlightedSet, cards) &&
					!!findCard(card, highlightedSet)}
				<Card {card} onchange={(card) => (cards[i] = card)} index={i} highlighted={isHighlighted} />
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
		align-items: flex-start;

		.image {
			flex: 1;
			min-width: 300px;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				image-orientation: none;
			}
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
		justify-content: center;
		padding: 0;
		margin: 0;

		li {
			list-style-type: none;
			padding: 0;
			margin: 0;
			display: flex;
			justify-content: center;

			button {
				display: grid;
				grid-template-columns: repeat(3, 100px);
				gap: calc(var(--pico-spacing) / 2);
				background-color: transparent;
				padding: 0;
				margin: 0;
				border: none;

				&[data-selected='true'] {
					outline: 2px solid var(--pico-primary);
					outline-offset: 2px;

					&:focus {
						box-shadow: none;
					}
				}
			}
		}
	}
</style>
