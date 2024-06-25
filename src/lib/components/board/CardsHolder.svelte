<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import Card from './Card.svelte';
	import {
		CARDS_MAP,
		UPPER_CARDS,
		FLIP_DURATION_MS,
		matches,
		type TCard,
		mismatch,
		passedTrees,
		DEPTH_MAP
	} from '$lib/store';

	let items = [...UPPER_CARDS];

	function handleDnd(e: CustomEvent<DndEvent<TCard>>): void {
		items = e.detail.items;
	}

	const depthMap: { [key: number]: number } = {};
	const cardsArr = Array.from(CARDS_MAP.values());
	let parent: TCard;

	function updateItems(m: Array<TCard[]>): void {
		if (!m.length) return;
		parent = CARDS_MAP.get(m[0][0].parent!)!;

		// check wins
		if (!parent.parent) {
			passedTrees.update((pt) =>
				parent.depth === 0 ? { ...pt, primary: true } : { ...pt, secondary: true }
			);
			return;
		}

		// only then push combination result
		items.unshift(parent);

		if (!depthMap[parent.depth]) depthMap[parent.depth] = 1;

		if (depthMap[parent.depth] !== DEPTH_MAP[parent.depth]) {
			depthMap[parent.depth] += 1;
			return;
		}

		// need shuffle
		cardsArr
			.filter((c) => c.depth === parent.depth && !c.children)
			.forEach((c) => {
				items.unshift(c);
			});
	}

	function getMismatchBack(card: TCard | null): void {
		if (!card) return;
		items.unshift({ ...card });
	}

	$: updateItems($matches);
	$: getMismatchBack($mismatch);
</script>

<section class="border py-3">
	<div
		use:dndzone={{ items, flipDurationMs: FLIP_DURATION_MS, dropTargetStyle: {} }}
		on:consider={handleDnd}
		on:finalize={handleDnd}
		class="container my-[-10px] flex gap-3 overflow-hidden overflow-x-scroll py-[10px]"
	>
		{#each items as card (card.id)}
			<div animate:flip={{ duration: FLIP_DURATION_MS }} class="flex-shrink-0">
				<Card data={card} />
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		position: relative;
		background-image: url('$lib/assets/cards-holder-bg.svg');
		background-size: contain;
	}

	section::after {
		position: absolute;
		content: '';
		inset: 0;
		background: linear-gradient(to right, #bc4e9c, #f80759);
		z-index: -1;
	}
</style>
