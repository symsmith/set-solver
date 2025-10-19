<script lang="ts">
	const {
		label,
		current,
		onchange
	}: {
		label: string;
		current: string | number;
		onchange: () => void;
	} = $props();
</script>

<div>
	<small>{label}</small>
	<button onclick={onchange}>{current}</button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	small {
		font-size: 0.6rem;
		color: var(--pico-secondary);
	}

	button {
		margin: 0;
		padding: 0;
		padding-inline: 0.2rem;
		border: none;
		min-width: 1rem;
		font-size: 0.7rem;
	}
</style>
