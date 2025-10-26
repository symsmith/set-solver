<script lang="ts">
	import {
		getNextColor,
		getNextCount,
		getNextFilling,
		getNextShape
	} from '$lib/client/solver/solve';
	import type { Card } from '$lib/shared/types/solver';
	import Palette from 'phosphor-svelte/lib/Palette';
	import Pencil from 'phosphor-svelte/lib/Pencil';
	import PlusMinus from 'phosphor-svelte/lib/PlusMinus';
	import Shapes from 'phosphor-svelte/lib/Shapes';

	const {
		card,
		onchange,
		index,
		highlighted = false
	}: {
		card: Card;
		onchange?: (newCard: Card) => void;
		index?: number;
		highlighted?: boolean;
	} = $props();

	const shape = $derived(
		card.shape === 'pill' ? 'oval' : card.shape === 'wave' ? 'squiggle' : card.shape
	);
	const filling = $derived(
		card.filling === 'empty' ? 'open' : card.filling === 'full' ? 'solid' : card.filling
	);
	const color = $derived(card.color === 'purple' ? 'blue' : card.color);

	const imgUrl = $derived(`https://smart-games.org/images/${shape}_${filling}_${color}.png`);
</script>

<div class="card" data-highlighted={highlighted}>
	{#if index != undefined}
		<span class="index">#{index}</span>
	{/if}
	{#each { length: card.count } as _, i (i)}
		<img src={imgUrl} alt="{card.color} {card.filling} {card.shape}" />
	{/each}
	{#if onchange}
		<div class="settings">
			<button
				title="Shape"
				onclick={() => onchange?.({ ...card, shape: getNextShape(card.shape) })}
			>
				<Shapes />
			</button>
			<button
				title="Color"
				onclick={() => onchange?.({ ...card, color: getNextColor(card.color) })}
			>
				<Palette />
			</button>
			<button
				title="Fill"
				onclick={() => onchange?.({ ...card, filling: getNextFilling(card.filling) })}
			>
				<Pencil />
			</button>
			<button
				title="Count"
				onclick={() => onchange?.({ ...card, count: getNextCount(card.count) })}
			>
				<PlusMinus />
			</button>
		</div>
	{/if}
</div>

<style>
	.card {
		margin: 0;
		aspect-ratio: 2 / 3;
		background-color: white;
		border-radius: var(--pico-border-radius);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: center;
		padding: 15% 10%;
		gap: calc(var(--pico-spacing) / 2);
		border: solid 1px var(--pico-secondary);
		position: relative;

		&[data-highlighted='true'] {
			outline: 2px solid var(--pico-primary);
			outline-offset: 2px;
		}

		.index {
			position: absolute;
			top: 0;
			left: calc(var(--pico-spacing) / 4);
			color: var(--pico-secondary);
		}

		.settings {
			position: absolute;
			bottom: 0;
			display: flex;
			width: 100%;
			justify-content: space-evenly;
			padding: 0.2rem 0;

			button {
				background-color: white;
				padding: 0;
				color: var(--pico-primary);
				line-height: 1;
				border: none;
				touch-action: manipulation;
			}
		}
	}
</style>
