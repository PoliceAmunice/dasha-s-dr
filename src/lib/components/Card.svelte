<script lang="ts">
	import Draggable from './Draggable.svelte';

	export let title: string;
	export let slug: string;
	export let x: number;
	export let y: number;
</script>

<Draggable {x} {y}>
	<span id={slug}>
		{title}
	</span>
</Draggable>

<style>
	span {
		display: inline-flex;
		width: 100px;
		height: 30px;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border: solid 1px gray;
	}
</style>
