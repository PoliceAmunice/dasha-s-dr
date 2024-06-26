<script lang="ts">
	import { isDialogOpen, passedTrees } from '$lib/store';
	import moment from 'moment';
	import { onDestroy, onMount } from 'svelte';

	let counter = 0;
	let duration: moment.Duration;
	let time = '00:00:00';

	function increment(): void {
		if (document.hidden || $isDialogOpen) return;
		duration = moment.duration(++counter * 1000);
		time = getTime(duration);
	}

	function getTime(duration: moment.Duration): string {
		return `${getDigit(duration.hours())}:${getDigit(duration.minutes())}:${getDigit(
			duration.seconds()
		)}`;
	}

	function getDigit(number: number): string {
		return number.toString().padStart(2, '0');
	}

	let clear: number;
	$: {
		clear = setInterval(increment, 1000);
	}

	passedTrees.subscribe((pt) => {
		if (pt.primary && pt.secondary) {
			clearInterval(clear);
		}
	});

	onMount(increment);
	onDestroy(() => clearInterval(clear));
</script>

<span class="font-mono">⏱️ {time}</span>
