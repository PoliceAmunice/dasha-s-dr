<script lang="ts">
	import * as Card from '../ui/card';
</script>

<div class="border bg-gray-400 py-3">
	<div class="container mb-[-10px] flex gap-3 overflow-hidden overflow-x-scroll pb-[10px]">
		{#each [1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1, 1, 1, 1, 1] as card}
			<Card.Root class="h-48 w-36 flex-shrink-0 shadow-md">
				<div class="mx-auto mt-1.5 h-32 w-32 rounded-lg bg-zinc-900"></div>
				<Card.Title class="p-2 text-center text-sm">Японский иероглиф</Card.Title>
			</Card.Root>
		{/each}
	</div>
</div>
