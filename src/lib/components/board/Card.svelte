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
	<div
		class="relative mx-auto mt-1.5 h-32 w-32 rounded-lg border border-card bg-zinc-900 bg-cover bg-center bg-no-repeat shadow-inner"
		style="background-image: url({data.imageUri});"
	></div>
	<UICard.Title class="overflow-hidden break-words p-2 text-center text-sm"
		>{data.title}</UICard.Title
	>
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
