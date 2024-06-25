<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import GarbageBinSVG from '$lib/assets/garbage-bin.svelte';

	let isOpen = false;
	const toggleOpen = () => (isOpen = !isOpen);
</script>

<Button on:click={toggleOpen} variant="ghost" class="relative h-[200px] flex-col">
	<GarbageBinSVG />
	<span class="absolute bottom-3 text-2xl font-bold">DROP TABLE</span>
</Button>

<Dialog.Root onOpenChange={toggleOpen} open={isOpen}>
	<Dialog.Content class="p-12] flex max-w-5xl rotate-12 flex-col overflow-hidden">
		<Dialog.Title class="text-center text-7xl font-black">эТа КнОпКа</Dialog.Title>
		<p class="text-md text-center text-muted-foreground">
			осталась от старой механики<br />
			но она забавная и я её уже сверстал<br />
			поэтому она здесь...<br />
			жмакай на здоровье!!1<br />
		</p>
	</Dialog.Content>
</Dialog.Root>
