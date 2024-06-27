<script lang="ts">
	import { matches, CARDS_MAP } from '$lib/store';

	let isShown = false;
	let isVoted = false;
	let isPushed = false;

	const unsubscribe = matches.subscribe((m) => {
		if (!m.length) return;

		const lastMatchParent = CARDS_MAP.get(m[0][0].parent!);

		if (lastMatchParent?.title === 'Коллеги') {
			isShown = true;
			unsubscribe();
		}
	});

	let timer: number;
	function debounceInputChange(): void {
		clearTimeout(timer);
		timer = setTimeout(() => {
			isVoted = true;
			isPushed = true;
			setTimeout(() => {
				isPushed = false;
				isShown = false;
			}, 2000);
		}, 1000);
	}
</script>

<div class:show={isShown} class:thanks={isVoted} class:pushed={isPushed} class="widget">
	<button on:click={() => (isShown = false)}>╳</button>
	<h3 class="text-center">Оцените, насколько вы готовы порекомендовать эту игру вашим кентам?</h3>
	<div class="range-slider">
		<input on:input={debounceInputChange} type="range" min="1" max="10" value="0" />
	</div>
</div>

<style lang="postcss">
	button {
		position: absolute;
		top: 0.2rem;
		right: 0.6rem;
		transform: scale(1.3, 0.7);
		font-family: theme(fontFamily.mono);
		color: #8d8d8d;
	}

	.widget {
		position: fixed;
		bottom: 0;
		left: calc(50% - 350px);
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		width: 700px;
		padding: 2rem;
		border: 1px solid #dcf0ff;
		transform: translateY(100%);
		border-radius: theme(borderRadius.md) theme(borderRadius.md) 0 0;
		color: #464646;
		background-color: #f8f8f8;
		transition: transform 0.5s ease;
		z-index: 10;

		&.show {
			transform: translateY(0);
		}

		&.pushed {
			transform: translateY(20%);
		}

		&.thanks::after {
			content: 'Большое спасибо!';
			position: absolute;
			inset: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 3rem;
			background-image: url('/src/lib/assets/widget/thanks-cat.png');
			background-repeat: no-repeat;
			background-color: inherit;
			background-position: 50% 1rem;
			z-index: 11;
		}
	}

	.range-slider {
		position: relative;
		height: 40px;
		margin-bottom: 1rem;
		padding-right: 30px;
		background-image: url('$lib/assets/widget/fake-slider-bg.png');
		background-size: 350px;
		background-position-x: 30px;
		background-repeat: no-repeat;

		& input {
			width: 350px;
			margin-top: 21px;
			height: 25px;
			background-color: transparent;

			&::-moz-range-thumb {
				appearance: none;
				background-color: #0f71c8;
				border: 0px solid #0f71c8;
				border-radius: 50%;
				height: 25px;
				width: 25px;
			}
		}

		&::before,
		&&::after {
			position: absolute;
			bottom: -2rem;
			color: #8d8d8d;
			font-size: theme(fontSize.sm);
		}
		&::before {
			content: 'ху*йня ебаная';
			left: -4rem;
		}
		&::after {
			content: 'это просто оху*енно';
			right: -4rem;
		}
	}
</style>
