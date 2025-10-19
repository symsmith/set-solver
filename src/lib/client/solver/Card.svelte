<script lang="ts">
	import Setting from '$lib/client/solver/Setting.svelte';
	import {
		getNextColor,
		getNextCount,
		getNextFilling,
		getNextShape
	} from '$lib/client/solver/solve';
	import type { Card } from '$lib/shared/types/solver';

	const { card, onchange }: { card: Card; onchange: (newCard: Card) => void } = $props();

	let showSettings = $state(false);

	const shape = $derived(
		card.shape === 'pill' ? 'oval' : card.shape === 'wave' ? 'squiggle' : card.shape
	);
	const filling = $derived(
		card.filling === 'empty' ? 'open' : card.filling === 'full' ? 'solid' : card.filling
	);
	const color = $derived(card.color === 'purple' ? 'blue' : card.color);

	const imgUrl = $derived(`https://smart-games.org/images/${shape}_${filling}_${color}.png`);
</script>

{#if showSettings}
	<div class="card" data-settings={showSettings}>
		<button class="close" type="button" onclick={() => (showSettings = false)}>close</button>
		<Setting
			label="Count"
			current={card.count}
			onchange={() => onchange({ ...card, count: getNextCount(card.count) })}
		/>
		<Setting
			label="Color"
			current={card.color}
			onchange={() => onchange({ ...card, color: getNextColor(card.color) })}
		/>
		<Setting
			label="Shape"
			current={card.shape}
			onchange={() => onchange({ ...card, shape: getNextShape(card.shape) })}
		/>
		<Setting
			label="Filling"
			current={card.filling}
			onchange={() => onchange({ ...card, filling: getNextFilling(card.filling) })}
		/>
	</div>
{:else}
	<button
		class="card"
		type="button"
		onclick={() => (showSettings = true)}
		data-settings={showSettings}
	>
		{#each { length: card.count } as _, i (i)}
			<img src={imgUrl} alt="{card.color} {card.filling} {card.shape}" />
		{/each}
	</button>
{/if}

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

		&[data-settings='true'] {
			padding: 5%;
			gap: calc(var(--pico-spacing) / 4);
			position: relative;

			.close {
				position: absolute;
				right: 5%;
				top: 0;
				padding: 0;
				background-color: transparent;
				border: none;
				color: var(--pico-primary);
				font-size: 0.6rem;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>
