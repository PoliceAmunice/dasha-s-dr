import type { Streaks } from '$lib/store';

type StreakCommentMap = Map<keyof Streaks, { [value: number]: string }>;

export const STREAK_COMMENT_MAP: StreakCommentMap = new Map([
	[
		'matches',
		{
			2: 'Вы варите великолепно!',
			3: 'Ну что за лев этот тигр...',
			5: 'Кто-то слил тебе базу или что?',
			8: 'Играй уже не глядя. Тебе слишком легко.'
		}
	],
	[
		'mismatches',
		{
			2: 'Пу-пу-пууу...',
			3: 'Но мы всё ещё верим, что у тебя получится!',
			5: 'Ну, а может и мы чё-то напутали)0))',
			8: 'Прасте!!1'
		}
	]
]);
