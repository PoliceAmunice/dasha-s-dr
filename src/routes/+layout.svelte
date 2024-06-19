<main>
	<slot />
</main>

<style lang="postcss">
	:global(html) {
		font: 15px 'Comics Sans';
		color: #101010;
		background-color: #eaeaea;
	}

	:global(body) {
		display: flex;
		justify-content: center;
		min-height: 100vh;
	}
</style>
