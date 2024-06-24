<script lang="ts">
	import moment from 'moment';
	import { onDestroy, onMount } from 'svelte';

	let counter = 0;
	let duration: moment.Duration;
	let time = '00:00:00';

	// TODO start count only after onboarding
	function increment(): void {
		if (document.hidden) return;
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

	onMount(increment);
	onDestroy(() => clearInterval(clear));
</script>

<span class="font-mono text-sm text-muted-foreground">{time}</span>
