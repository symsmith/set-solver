<script lang="ts">
	import type { Card } from '$lib/shared/types/solver';

	const { card }: { card: Card } = $props();

	const shape = $derived(
		card.shape === 'pill' ? 'oval' : card.shape === 'wave' ? 'squiggle' : card.shape
	);
	const filling = $derived(
		card.filling === 'empty' ? 'open' : card.filling === 'full' ? 'solid' : card.filling
	);
	const color = $derived(card.color === 'purple' ? 'blue' : card.color);

	const imgUrl = $derived(`https://smart-games.org/images/${shape}_${filling}_${color}.png`);
</script>

<div class="card">
	{#each { length: card.count } as _, i (i)}
		<img src={imgUrl} alt="{card.color} {card.filling} {card.shape}" />
	{/each}
</div>

<style>
	.card {
		aspect-ratio: 2 / 3;
		background-color: white;
		border-radius: var(--pico-border-radius);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 15% 10%;
		gap: calc(var(--pico-spacing) / 2);
		border: solid 1px var(--pico-secondary);
	}
</style>
