<script>
	import clsx from 'clsx';
	import Counter from './Counter.svelte';
	import Timer from './Timer.svelte';
</script>

<header class={clsx('border', $$props.class)}>
	<div class="container flex h-12 items-center justify-between text-sm text-muted-foreground">
		<Timer />
		<Counter />
	</div>
</header>
