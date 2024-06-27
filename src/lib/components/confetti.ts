import { matches, passedTrees } from '$lib/store';
import confetti from 'canvas-confetti';

export function initConfetti(): void {
	matches.subscribe((m) => {
		if (!m.length) return;
		confetti();
	});

	passedTrees.subscribe((pt) => {
		if (!pt.primary || !pt.secondary) return;

		const confetti = getConfettiFn(Date.now());
		confetti();
	});
}

function getConfettiFn(startTime: number): () => void {
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
