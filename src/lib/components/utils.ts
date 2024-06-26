import confetti from 'canvas-confetti';

export function getConfettiFn(startTime: number): () => void {
	const duration = 30 * 1000;
	const end = startTime + duration;

	function fire() {
		// launch a few confetti from the left edge
		confetti({
			particleCount: 7,
			angle: 60,
			spread: 55,
			origin: { x: 0 }
		});
		// and launch a few from the right edge
		confetti({
			particleCount: 7,
			angle: 120,
			spread: 55,
			origin: { x: 1 }
		});

		// keep going until we are out of time
		if (Date.now() < end) {
			requestAnimationFrame(fire);
		}
	}

	return fire;
}
