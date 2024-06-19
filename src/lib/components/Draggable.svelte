<script lang="ts">
	export let x: number;
	export let y: number;

	let moving = false;
	let zIndex: number | null = null;

	function onMouseDown(): void {
		moving = true;
		zIndex = 1000;
	}

	function onMouseMove(e: MouseEvent): void {
		if (moving) {
			x += e.movementX;
			y += e.movementY;
		}
	}

	function onMouseUp(): void {
		moving = false;
		zIndex = null;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:mousedown={onMouseDown} style:z-index={zIndex} style="left: {x}px; top: {y}px;">
	<slot />
</span>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	span {
		position: absolute;
		user-select: none;
		cursor: move;
	}
</style>
