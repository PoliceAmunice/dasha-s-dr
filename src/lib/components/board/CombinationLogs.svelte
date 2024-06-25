<script lang="ts">
	import clsx from 'clsx';
	import { matches } from '$lib/store';
	import CombinationLog from './CombinationLog.svelte';
	import { flip } from 'svelte/animate';
</script>

<div class={clsx('flex flex-col', $$props.class)}>
	<h2 class="py-4 text-center text-lg font-semibold leading-none tracking-tight">
		История комбинаций
	</h2>
	<div class="h-10 flex-grow overflow-x-hidden overflow-y-scroll px-4">
		{#if $matches.length}
			{#each $matches as match (match[0].id)}
				<div animate:flip={{ duration: 300 }}>
					<CombinationLog data={match} class="mb-4" />
				</div>
			{/each}
		{:else}
			<p class="mt-[10%] text-center text-3xl">🤔</p>
			<p class="text-center text-sm text-muted-foreground">
				наверное,<br />надо что-нибудь отгадать...
			</p>
		{/if}
	</div>
</div>
