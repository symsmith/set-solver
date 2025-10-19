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
	}

	small {
		font-size: 0.6rem;
		color: var(--pico-secondary);
	}

	button {
		margin: 0;
		padding: 0;
		background-color: transparent;
		border: none;
		color: var(--pico-primary);
		font-size: 0.7rem;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
