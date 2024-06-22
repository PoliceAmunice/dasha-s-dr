import data from './data.drawio.json';

type TLink = {
	target: string;
	source: string;
};

export type TCard = {
	slug: string;
	title: string;
	level: number; // to determine collision with parentless neighbor nodes
	parent: string | null;
	children: string[] | null;
};

export const CARDS = new Map<string, TCard>();
const links: TLink[] = [];
let finalRoot: TCard;
let funnyFinalRoot: TCard;

data.forEach((entry) => {
	if (entry._target) {
		links.push({ target: entry._target, source: entry._source });
	} else if (entry._value) {
		const card = {
			slug: entry._id,
			title: entry._value,
			level: 0,
			parent: null,
			children: null
		};

		CARDS.set(entry._id, card);

		if (card.title.includes('Филипп')) {
			finalRoot = card;
		} else if (card.title.includes('Даша')) {
			funnyFinalRoot = card;
		}
	}
});

let child;
let parent;
links.forEach((link) => {
	child = CARDS.get(link.source)!;
	parent = CARDS.get(link.target)!;

	child.parent = link.target;
	if (parent.children) {
		parent.children.push(link.source);
	} else {
		parent.children = [link.source];
	}
});

export let MAX_LEVEL = 0;

function setDepth(node: TCard, level: number) {
	node.level = level;
	if (MAX_LEVEL < level) MAX_LEVEL++;
	if (!node.children) return;
	for (const c of node.children.map((slug) => CARDS.get(slug)!)) setDepth(c, level + 1);
}

setDepth(finalRoot!, 0);
setDepth(funnyFinalRoot!, 3);
