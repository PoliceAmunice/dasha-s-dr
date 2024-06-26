<script lang="ts">
	import { matches, CARDS_MAP, UPPER_CARDS } from '$lib/store';
	import clsx from 'clsx';

	const cardsToOpen = (CARDS_MAP.size - UPPER_CARDS.length) / 2 - 2;
	let counter = `0/${cardsToOpen}`;
	let isStonks = false;

	matches.subscribe((m) => {
		counter = `${m.length}/${cardsToOpen}`;
		isStonks = m.length > cardsToOpen;
	});
</script>

<span
	>Открыто экземпляров: <span class={clsx('font-mono', isStonks && 'stonks')}>{counter}</span> 📈</span
>

<style>
	span {
		position: relative;
	}

	span.stonks::after {
		content: '🗿';
		position: absolute;
		right: -38px;
		bottom: 2px;
		font-size: 2rem;
	}
</style>
