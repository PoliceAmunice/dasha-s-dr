import type { TPoint } from "$lib/helpers";

export type TCard = {
	slug: string;
	title: string;
	level: number; // to determine collision with parentless neighbor nodes
	parent: string | null;
	children: string[] | null;
	coords: TPoint;
};

export const CARDS: TCard[] = [
	{
		slug: 'proxy_cache',
		title: 'Proxy, Cache',
		level: 0,
		parent: 'android_studio',
		children: null,
		coords: {
			x: 300,
			y: 100
		}
	},
	{
		slug: 'offline_mode',
		title: 'Offline mode',
		level: 0,
		parent: 'android_studio',
		children: null,
		coords: {
			x: 300,
			y: 150
		}
	},
	{
		slug: 'android_studio',
		title: 'Android Studio',
		level: 1,
		parent: 'rope_and_soap',
		children: ['proxy_cache', 'offline_mode'],
		coords: {
			x: 300,
			y: 200
		}
	},

	{
		slug: 'japan_hieroglyph',
		title: '仝々ヾ',
		level: 0,
		parent: 'power_shell',
		children: null,
		coords: {
			x: 300,
			y: 250
		}
	},
	{
		slug: 'windows',
		title: 'Windows',
		level: 0,
		parent: 'power_shell',
		children: null,
		coords: {
			x: 300,
			y: 300
		}
	},
	{
		slug: 'power_shell',
		title: 'Power Shell',
		level: 1,
		parent: 'rope_and_soap',
		children: ['japan_hieroglyph', 'windows'],
		coords: {
			x: 300,
			y: 350
		}
	},

	{
		slug: 'rope_and_soap',
		title: '!@#$',
		level: 2,
		parent: 'proebatsa',
		children: ['japan_hieroglyph', 'windows'],
		coords: {
			x: 300,
			y: 350
		}
	},

	{
		slug: 'anjelika',
		title: 'Анжелика',
		level: 1,
		parent: 'kurilka',
		children: null,
		coords: {
			x: 300,
			y: 400
		}
	},
	{
		slug: 'vertodrom',
		title: 'Вертодром',
		level: 1,
		parent: 'kurilka',
		children: null,
		coords: {
			x: 300,
			y: 450
		}
	},
	{
		slug: 'kurilka',
		title: 'курилка',
		level: 2,
		parent: 'proebatsa',
		children: ['japan_hieroglyph', 'windows'],
		coords: {
			x: 300,
			y: 350
		}
	},

	{
		slug: 'proebatsa',
		title: 'проебаться',
		level: 3,
		parent: null,
		children: ['japan_hieroglyph', 'windows'],
		coords: {
			x: 300,
			y: 350
		}
	}
];
