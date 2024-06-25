<script>
	import Board from '$lib/components/board/Board.svelte';
	import CardsHolder from '$lib/components/board/CardsHolder.svelte';
	import CombinationLogs from '$lib/components/board/CombinationLogs.svelte';
	import Controls from '$lib/components/board/Controls.svelte';
	import Header from '$lib/components/header/Header.svelte';
</script>

<div class="flex min-h-svh flex-col">
	<Header />
	<section class="container flex flex-grow">
		<CombinationLogs class="basis-1/4" />
		<Board class="flex-grow" />
		<Controls class="basis-1/4" />
	</section>
	<CardsHolder />
</div>
