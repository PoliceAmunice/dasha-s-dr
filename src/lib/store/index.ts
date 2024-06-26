import { writable } from 'svelte/store';
import {
	CARDS_MAP,
	COMBINATION_SIZE,
	DEPTH_MAP,
	MAX_DEPTH,
	UPPER_CARDS,
	type TCard
} from './draw-io';

type Streaks = {
	matches: number;
	mismatches: number;
};

const matches = writable<TCard[][]>([]);
const mismatch = writable<TCard>();
const streaks = writable<Streaks>({ matches: 0, mismatches: 0 });

type PassedTrees = {
	primary: boolean;
	secondary: boolean;
};

const passedTrees = writable<PassedTrees>({ primary: false, secondary: false });

// initial is `true` cause of onboarding dialog at the start
const isDialogOpen = writable<boolean>(true);

const FLIP_DURATION_MS = 300;

export {
	//writable
	matches,
	mismatch,
	streaks,
	passedTrees,
	isDialogOpen,
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
