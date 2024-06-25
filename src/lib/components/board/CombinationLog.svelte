<script lang="ts">
	import clsx from 'clsx';
	import * as UICard from '$lib/components/ui/card';
	import { type TCard, CARDS_MAP } from '$lib/store';

	export let data: TCard[];
	const parent = CARDS_MAP.get(data[0].parent!)!;
</script>

<UICard.Root class={clsx('', $$props.class)}>
	<UICard.Header class="text-center">
		<UICard.Title>
			{#each data as card, index (card.id)}
				{#if index !== 0}
					<div class="pt-1">➕</div>
				{/if}
				<div>{card.title}</div>
			{/each}
		</UICard.Title>
		<div class="pt-3 text-lg">👇</div>
		<div class="text-xl">{parent.title}</div>
		<UICard.Description>Мы помним, почему ты на самом деле ушла из Хауса</UICard.Description>
	</UICard.Header>
</UICard.Root>
