/**
 * The de-facto unbiased shuffle algorithm, {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle|the Fisher–Yates (aka Knuth) Shuffle}.
 * {@link https://stackoverflow.com/a/2450976|Code source}.
 */
export function shuffle(array: unknown[]): void {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
}
