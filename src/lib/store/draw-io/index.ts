import data from './data.drawio.json';
import { shuffle } from './utils';

type TLink = {
	target: string;
	source: string;
};

type TImages = { [parent: string]: string };

type TDescriptions = TImages;

type TCard = {
	id: string;
	title: string;
	depth: number; // to determine collision with parentless neighbor nodes
	parent: string | null;
	children: string[] | null;
	imageUri: string;
	description?: string;
};

/**
 * Parse tree
 */

const cells = data.mxfile.diagram.mxGraphModel.root.mxCell;
const cards: TCard[] = [];
const links: TLink[] = [];
const images: TImages = {};
const descriptions: TDescriptions = {};

let primaryTreeRoot: TCard;
let secondaryTreeRoot: TCard;

function findCard(id: string): TCard {
	return cards.find((c) => c.id === id)!;
}

const rootCell = cells.find((cell) => cell._id.endsWith('-1'));
if (!rootCell) {
	throw new Error("Couldn't find root cell id. Maybe, scheme format has changed?");
}
const rootCellId = rootCell._id!;

cells.forEach((entry) => {
	// arrow
	if (entry._target) {
		links.push({ target: entry._target, source: entry._source });
		return;
	}

	// title
	if (entry._parent === rootCellId && entry._value) {
		const card: TCard = {
			id: entry._id,
			title: entry._value,
			depth: 0,
			parent: null,
			children: null,
			imageUri: ''
		};
		cards.push(card);

		// Dirty, but simple. Judge me not.
		if (card.title.includes('Филипп')) {
			primaryTreeRoot = card;
		} else if (card.title.includes('Даша')) {
			secondaryTreeRoot = card;
		}

		return;
	}

	// image
	if (!entry._value && entry._style) {
		const imageUri = entry._style
			.split('image=')
			.pop()!
			.replace(/data:image\/(png|jpg|jpeg)/, (m: string) => m + ';base64')
			.slice(0, -1);

		images[entry._parent] = imageUri;
		return;
	}

	// description
	if (entry._parent && entry._value) {
		descriptions[entry._parent] = entry._value;
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

cards.forEach((c) => {
	c.description = descriptions[c.id];
	c.imageUri = images[c.id];
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

export { CARDS_MAP, UPPER_CARDS, MAX_DEPTH, DEPTH_MAP, type TCard };
