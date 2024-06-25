<script lang="ts">
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import Card from './Card.svelte';
	import { FLIP_DURATION_MS, matches, mismatch, passedTrees, type TCard } from '$lib/store';
	import { flip } from 'svelte/animate';
	import clsx from 'clsx';

	let items: TCard[] = [];

	function handleConsider(e: CustomEvent<DndEvent<TCard>>): void {
		items = e.detail.items;
	}

	function handleFinalize(e: CustomEvent<DndEvent<TCard>>): void {
		items = e.detail.items;

		if (items.length !== 2) {
			return;
		}

		if (!areMatchingCards(items)) {
			const mismatching = items.pop()!;
			mismatch.set(mismatching);
			items = [...items];
			return;
		}

		matches.update((m) => {
			m.unshift(items);
			return m;
		});
		items = [];
	}

	function areMatchingCards(cards: TCard[]): boolean {
		return cards.every((c) => c.parent === cards[0].parent);
	}

	$: options = {
		dropFromOthersDisabled: items.length == 2,
		items,
		dropTargetStyle: {},
		flipDurationMs: FLIP_DURATION_MS
	};
</script>

<div
	use:dndzone={options}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
	class={clsx($passedTrees.primary && $passedTrees.secondary && 'hide')}
>
	{#each items as card (card.id)}
		<span animate:flip={{ duration: FLIP_DURATION_MS }} class="z-50">
			<Card data={card} />
		</span>
	{/each}
</div>

<style>
	div {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		height: calc(12rem + 3rem);
		width: calc(9rem * 2 + 6rem);
		padding: 1rem;
	}

	div::after,
	div::before {
		content: '❔';
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		height: calc(12rem + 3rem);
		width: calc(9rem + 2rem);
		border: 1px solid rgb(229, 229, 229);
		border-radius: 0.5rem;
		font-size: 5rem;
	}

	div::before {
		left: 0;
	}

	div::after {
		right: 0;
	}

	div.hide {
		display: none;
	}
</style>
