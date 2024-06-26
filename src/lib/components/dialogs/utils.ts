import { isDialogOpen } from '$lib/store';

export function broadOpenState(isOpen: boolean): void {
	isDialogOpen.set(isOpen);
}
