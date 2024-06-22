<script lang="ts">
	import { CARDS, MAX_LEVEL, type TCard } from '$lib/draw-io';
	import { getAverageNumber, getRectFromElement, hasNoCollision } from '$lib/helpers';
	import Card from './Card.svelte';

	const CARDS_ARR = Array.from(CARDS.values());

	const initialCards = CARDS_ARR.filter((c) => c.level === MAX_LEVEL);
	let boardEl: HTMLElement;
	let matchedCardsCount = 0;
	let whiteCardsCount = 0;
	let cardComps: { [key: string]: Card } = {};

	function onMouseUp(e: MouseEvent): void {
		// TODO Need to match card size instead of a single point
		const els = document.elementsFromPoint(e.clientX, e.clientY);
		const target = els.find((el) => el.id) as HTMLElement;
		if (!target) {
			return;
		}

		const firstColliedEl = els.find((el) => !!el.id && el.id !== target.id) as HTMLElement;
		if (!firstColliedEl) {
			return;
		}

		const rect1 = getRectFromElement(target);
		const rect2 = getRectFromElement(firstColliedEl);
		if (hasNoCollision(rect1, rect2)) {
			return;
		}

		const card1 = CARDS.get(target.id);
		const card2 = CARDS.get(firstColliedEl.id);
		if (!card1?.parent || !card2?.parent || !areMatchingCards(card1, card2)) {
			return;
		}

		cardComps[card1.slug].$destroy();
		cardComps[card2.slug].$destroy();

		const nextCard = CARDS.get(card1.parent)!;
		cardComps[nextCard.slug] = new Card({
			target: boardEl,
			props: {
				slug: nextCard.slug,
				title: nextCard.title,
				x: getAverageNumber([rect1.x, rect2.x]),
				y: getAverageNumber([rect1.y, rect2.y])
			}
		});

		// Parentless logic

		if (!nextCard.parent) {
			return alert(nextCard.level === 0 ? 'win' : 'wrong tree!');
		}

		// Childfree logic

		if (matchedCardsCount === 0) {
			whiteCardsCount = CARDS_ARR.filter((c) => c.level === nextCard.level && !!c.children).length;
		}

		if (++matchedCardsCount !== whiteCardsCount) {
			return;
		}

		matchedCardsCount = 0;
		CARDS_ARR.filter((c) => c.level === nextCard.level && !c.children).forEach((c) => {
			cardComps[c.slug] = new Card({
				target: boardEl,
				props: {
					slug: c.slug,
					title: c.title,
					x: 0,
					y: 0
				}
			});
		});
	}

	function areMatchingCards(c1: TCard, c2: TCard): boolean {
		return c1.parent === c2.parent;
	}
</script>

<section>
	<h1>TEST</h1>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:mouseup={onMouseUp} bind:this={boardEl}>
		{#each initialCards as card (card.slug)}
			<Card
				bind:this={cardComps[card.slug]}
				slug={card.slug}
				title={card.title}
				x={0}
				y={0}
			/>
		{/each}
	</div>
</section>

<style>
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 500px;
		height: 500px;
	}

	h1 {
		text-align: center;
	}

	div {
		flex-grow: 1;
		background-color: white;
	}
</style>
