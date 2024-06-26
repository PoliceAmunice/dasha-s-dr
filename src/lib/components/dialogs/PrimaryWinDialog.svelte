<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { passedTrees } from '$lib/store';
	import { broadOpenState } from './utils';

	let isOpen = false;
	const unsubscribe = passedTrees.subscribe((pt) => {
		if (!pt.primary) return;
		isOpen = true;
		unsubscribe();
	});
</script>

<Dialog.Root open={isOpen} onOpenChange={broadOpenState}>
	<Dialog.Content class="flex h-[700px] max-w-5xl flex-col overflow-hidden p-12 pl-[31.5em]">
		<Dialog.Title class="text-center text-7xl font-black text-stone-700"
			>Поздравляем,<br />ты нашла<br />Филиппа!</Dialog.Title
		>
		<p class="text-md text-center text-muted-foreground">
			{#if $passedTrees.secondary}
				иди к нему
			{:else}
				но не было бы так интересно,<br />если б было бы так просто!
			{/if}
		</p>
		<p class="text-md text-center font-bold text-stone-700">
			{#if $passedTrees.secondary}
				он что-то знает про подарок...
			{:else}
				игра продолжается, смешивай дальше
			{/if}
		</p>
		<div></div>
	</Dialog.Content>
</Dialog.Root>

<style>
	div {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 540px;
		background-image: url('$lib/assets/primary-win-bg.png');
	}
</style>
