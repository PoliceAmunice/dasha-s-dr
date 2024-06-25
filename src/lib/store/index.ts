import { writable } from 'svelte/store';
import {
	CARDS_MAP,
	COMBINATION_SIZE,
	DEPTH_MAP,
	MAX_DEPTH,
	UPPER_CARDS,
	type TCard
} from './draw-io';

const matches = writable<TCard[][]>([]);
const mismatch = writable<TCard>();

type PassedTrees = {
	primary: boolean;
	secondary: boolean;
};

const passedTrees = writable<PassedTrees>({ primary: false, secondary: false });

const FLIP_DURATION_MS = 300;

export {
	//writable
	matches,
	mismatch,
	passedTrees,
	// constants
	CARDS_MAP,
	UPPER_CARDS,
	MAX_DEPTH,
	DEPTH_MAP,
	COMBINATION_SIZE,
	FLIP_DURATION_MS,
	// types
	type TCard
};
