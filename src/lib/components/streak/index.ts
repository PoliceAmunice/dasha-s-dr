import { matches, mismatch, streaks, type Streaks } from '$lib/store';
import { toast } from 'svelte-sonner';
import { STREAK_COMMENT_MAP } from './streak-comments';
import Streak from './Streak.svelte';

matches.subscribe(
	(m) =>
		m.length &&
		streaks.update((s) => ({
			mismatches: 0,
			matches: s.matches + 1
		}))
);

mismatch.subscribe(
	(m) =>
		m &&
		streaks.update((s) => ({
			matches: 0,
			mismatches: s.mismatches + 1
		}))
);

streaks.subscribe(showStreakToast);

function showStreakToast(s: Streaks): void {
	Object.entries(s).forEach(([streakType, streakValue]) => {
		if (streakValue === 0) return;

		const streak = STREAK_COMMENT_MAP.get(streakType as keyof Streaks);

		if (!streak || !streak[streakValue]) {
			return;
		}

		const emojii = streakType === 'matches' ? '🎉' : '🤷‍♀️';
		toast(streakValue + ' подряд ' + emojii, {
			description: streak[streakValue]
		});
	});
}

export { Streak };
