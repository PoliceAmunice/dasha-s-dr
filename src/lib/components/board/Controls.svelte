<script lang="ts">
	import clsx from 'clsx';
	import RulesDialog from '$lib/components/dialogs/RulesDialog.svelte';
	import PrimaryWinDialog from '$lib/components/dialogs/PrimaryWinDialog.svelte';
	import SecondaryWinDialog from '$lib/components/dialogs/SecondaryWinDialog.svelte';
	import OldButtonDialog from '$lib/components/dialogs/OldButtonDialog.svelte';
</script>

<div class={clsx('flex flex-col items-center justify-between py-4', $$props.class)}>
	<RulesDialog />
	<PrimaryWinDialog />
	<SecondaryWinDialog />
	<OldButtonDialog />
</div>
