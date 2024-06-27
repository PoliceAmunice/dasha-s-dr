<script lang="ts">
	import clsx from 'clsx';
	import { matches, mismatch, passedTrees } from '$lib/store';
	import { onMount } from 'svelte';
	import BoardCardsHolder from './BoardCardsHolder.svelte';

	let matchReactionEl: HTMLSpanElement;
	let mismatchReactionEl: HTMLSpanElement;

	onMount(() => {
		matches.subscribe((m) => {
			if (!m.length) return;
			fireAnimation(matchReactionEl, 'show');
		});

		mismatch.subscribe((m) => {
			if (!m) return;
			fireAnimation(mismatchReactionEl, 'show');
		});
	});

	function fireAnimation(el: HTMLElement, name: string): void {
		el.classList.add(name);
		Promise.all(el.getAnimations().map((a) => a.finished)).then(() => el.classList.remove(name));
	}
</script>

<section class={clsx($passedTrees.primary && $passedTrees.secondary && 'clear-bg', $$props.class)}>
	<span bind:this={matchReactionEl} class="reaction">🎉</span>
	<span bind:this={mismatchReactionEl} class="reaction">🤷‍♀️</span>

	<div class="flex h-full items-center justify-center gap-4">
		<BoardCardsHolder />
	</div>
</section>

<style>
	section {
		position: relative;
		background-image: url('$lib/assets/board/board-bg.jpg');
		background-repeat: no-repeat;
		background-size: cover;
	}

	section.clear-bg {
		background-image: url('$lib/assets/board/board-bg-clear.png');
	}

	.reaction {
		position: absolute;
		font-size: theme(fontSize.5xl);
		opacity: 0;
		top: 30%;
		left: calc(50% - theme(fontSize.5xl) / 2);
	}

	.reaction.show {
		animation: 1s react ease-out;
	}

	@keyframes react {
		from {
			top: 30%;
			opacity: 0;
		}
		40% {
			opacity: 1;
		}
		to {
			top: 0;
			opacity: 0;
		}
	}
</style>
