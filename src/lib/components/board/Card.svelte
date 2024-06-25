<script lang="ts">
	import * as UICard from '$lib/components/ui/card';
	import { MAX_DEPTH, type TCard } from '$lib/store';
	import clsx from 'clsx';

	export let data: TCard;
	const isParentless = !data.children && data.depth !== MAX_DEPTH;
</script>

<UICard.Root class={clsx('card-sizes relative shadow-md', $$props.class)}>
	{#if isParentless}
		<span>'😵‍💫'</span>
	{/if}
	<div class="mx-auto mt-1.5 h-32 w-32 rounded-lg bg-zinc-900"></div>
	<UICard.Title class="p-2 text-center text-sm">{data.title}</UICard.Title>
</UICard.Root>

<style>
	span {
		position: absolute;
		top: -20px;
		right: -20px;
		font-size: 2rem;
		transform: rotate(15deg);
		z-index: 10;
	}
</style>
