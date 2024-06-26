<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { passedTrees } from '$lib/store';
	import { broadOpenState } from './utils';

	let isOpen = false;
	const unsubscribe = passedTrees.subscribe((pt) => {
		if (!pt.secondary) return;
		isOpen = true;
		unsubscribe();
	});
</script>

<Dialog.Root open={isOpen} onOpenChange={broadOpenState}>
	<Dialog.Content class="flex max-w-5xl flex-col items-center overflow-hidden p-14">
		<div></div>
		<Dialog.Title class="text-center text-7xl font-black text-stone-700"
			>Поздравляем, ты<br />нашла себя!</Dialog.Title
		>
		<p class="text-md text-center text-muted-foreground">
			но мы эту ветку по приколу сделали чтоб тебя запутать
			{#if $passedTrees.primary}
				<br />
				на самом деле чтобы пройти игру, достаточно было знать, что
				<br />
				<span class="text-stone-700">ключ к подарку - это Филипп</span>
			{/if}
		</p>
		{#if $passedTrees.primary}
			<p class="text-md text-center font-bold text-stone-700">
				иди к Филиппу, он что-то знает про подарок...
			</p>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<style>
	div {
		height: 375px;
		width: 404px;
		background-image: url('$lib/assets/secondary-win-bg.png');
	}
</style>
