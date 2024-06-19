// /**
//  * Returns a random integer between min (inclusive) and max (inclusive).
//  * The value is no lower than min (or the next integer greater than min
//  * if min isn't an integer) and no greater than max (or the next integer
//  * lower than max if max isn't an integer).
//  * Using Math.round() will give you a non-uniform distribution!
//  */
//  function getRandomInt(min: number, max: number): number {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// 	function getRandomCoords(): {x: number, y: number} {
// 		return {
// 			x: getRandomInt(100, 200),
// 			y: Math.random(),
// 		}
// 	}

export function getAverageNumber(nums: number[]): number {
	const sum = nums.reduce((a, b) => a + b, 0);
	return sum / nums.length || 0;
}

export type TPoint = {
	x: number;
	y: number;
};

export type TRect = TPoint & {
	w: number;
	h: number;
};

/**
 * TODO – `getBoundingClientRect` is bad (reflow), so should do it by props instead
 */
export function getRectFromElement(el: HTMLElement): TRect {
	const { width: w, height: h, x, y } = el.getBoundingClientRect();
	return { w, h, x, y };
}

export function hasNoCollision(rect1: TRect, rect2: TRect): boolean {
	return (
		rect1.x > rect2.x + rect2.w ||
		rect1.x + rect1.w < rect2.x ||
		rect1.y > rect2.y + rect2.h ||
		rect1.y + rect1.h < rect2.y
	);
}
