<script lang="ts">
	import clsx from 'clsx';
	import * as Card from '../ui/card';
</script>

<div class={clsx('flex flex-col', $$props.class)}>
	<h2 class="py-4 text-center text-lg font-semibold leading-none tracking-tight">
		История комбинаций
	</h2>
	<div class="h-[200px] flex-grow overflow-x-hidden overflow-y-scroll px-4">
		{#each [1, 2, 3, 4, 5] as item}
			<Card.Root class="mb-4">
				<Card.Header>
					<Card.Title>Кофемашина + ИП Новикова</Card.Title>
					<Card.Description>Мы помним, почему ты на самом деле ушла из Хауса</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
</div>
