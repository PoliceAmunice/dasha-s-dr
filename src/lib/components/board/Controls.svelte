<script lang="ts">
	import clsx from 'clsx';
	import { Button } from '../ui/button';
	import GarbageBinSVG from '$lib/assets/garbage-bin.svelte';
	import RulesDialog from './RulesDialog.svelte';
</script>

<div class={clsx('flex flex-col items-center justify-between py-4', $$props.class)}>
	<RulesDialog />
	<Button variant="ghost" class="relative h-[200px] flex-col">
		<GarbageBinSVG />
		<span class="absolute bottom-3 text-2xl font-bold">DROP TABLE</span>
	</Button>
</div>
