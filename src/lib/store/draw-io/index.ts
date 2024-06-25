import data from './data.drawio.json';
import { shuffle } from './utils';

type TLink = {
	target: string;
	source: string;
};

type TCard = {
	id: string;
	title: string;
	depth: number; // to determine collision with parentless neighbor nodes
	parent: string | null;
	children: string[] | null;
};

/**
 * Parse tree
 */

const cards: TCard[] = [];
const links: TLink[] = [];
let primaryTreeRoot: TCard;
let secondaryTreeRoot: TCard;

function findCard(id: string): TCard {
	return cards.find((c) => c.id === id)!;
}

data.forEach((entry) => {
	if (entry._target) {
		links.push({ target: entry._target, source: entry._source });
	} else if (entry._value) {
		const card: TCard = {
			id: entry._id,
			title: entry._value,
			depth: 0,
			parent: null,
			children: null
		};
		cards.push(card);

		// Dirty, but simple. Judge me not.
		if (card.title.includes('Филипп')) {
			primaryTreeRoot = card;
		} else if (card.title.includes('Даша')) {
			secondaryTreeRoot = card;
		}
	}
});

let child;
let parent;
links.forEach((link) => {
	child = findCard(link.source);
	parent = findCard(link.target);

	child.parent = link.target;
	if (parent.children) {
		parent.children.push(link.source);
	} else {
		parent.children = [link.source];
	}
});

shuffle(cards);

/**
 * Set depth to nodes, get tree max depth
 */

let MAX_DEPTH = 0;

setDepth(primaryTreeRoot!, 0);
setDepth(secondaryTreeRoot!, 3);

function setDepth(node: TCard, depth: number): void {
	node.depth = depth;

	if (MAX_DEPTH < depth) MAX_DEPTH++;
	if (!node.children) return;

	for (const c of node.children.map(findCard)) {
		setDepth(c, depth + 1);
	}
}

/**
 * Set final constants
 */

const CARDS_MAP = new Map<string, TCard>();
const DEPTH_MAP: { [key: number]: number } = {};

cards.forEach((c) => {
	CARDS_MAP.set(c.id, c);

	if (c.children) {
		const value = DEPTH_MAP[c.depth];
		DEPTH_MAP[c.depth] = value ? value + 1 : 1;
	}
});

const UPPER_CARDS = cards.filter((c) => c.depth === MAX_DEPTH);
const COMBINATION_SIZE = 2;

export { CARDS_MAP, UPPER_CARDS, MAX_DEPTH, DEPTH_MAP, COMBINATION_SIZE, type TCard };
