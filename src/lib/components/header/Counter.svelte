<script lang="ts">
	import { matches, CARDS_MAP, UPPER_CARDS } from '$lib/store';
	import { onMount } from 'svelte';

	const cardsToOpen = (CARDS_MAP.size - UPPER_CARDS.length) / 2 - 2;
	let counter = `0/${cardsToOpen}`;

	onMount(() => matches.subscribe((m) => (counter = `${m.length}/${cardsToOpen}`)));
</script>

<span>Открыто экземпляров: <span class="font-mono">{counter}</span> 📈</span>
