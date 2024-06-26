<script lang="ts">
	import Board from '$lib/components/board/Board.svelte';
	import CardsHolder from '$lib/components/board/CardsHolder.svelte';
	import CombinationLogs from '$lib/components/board/CombinationLogs.svelte';
	import Controls from '$lib/components/board/Controls.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { getConfettiFn } from './utils';
	import { matches, mismatch, passedTrees, streaks } from '$lib/store';
	import { toast } from 'svelte-sonner';
	import Sonner from '$lib/components/Sonner.svelte';

	matches.subscribe(
		(m) =>
			m.length &&
			streaks.update((s) => ({
				...s,
				matches: s.matches + 1
			}))
	);
	mismatch.subscribe(
		(m) =>
			m &&
			streaks.update((s) => ({
				...s,
				mismatches: s.mismatches + 1
			}))
	);

	streaks.subscribe((s) => {
		if (s.matches === 3) {
			toast('Вы варите великолепно!');
			streaks.update((s) => ({ ...s, matches: 0 }));
		}

		if (s.mismatches === 3) {
			toast('Ну, или мы чё-то напутали...');
			streaks.update((s) => ({ ...s, mismatches: 0 }));
		}
	});

	passedTrees.subscribe((pt) => {
		if (pt.primary && pt.secondary) {
			const confetti = getConfettiFn(Date.now());
			confetti();
		}
	});
</script>

<div class="flex min-h-svh flex-col">
	<Header />
	<section class="container flex flex-grow">
		<CombinationLogs class="basis-1/4" />
		<Board class="flex-grow" />
		<Controls class="basis-1/4" />
	</section>
	<CardsHolder />

	<Sonner />
</div>
