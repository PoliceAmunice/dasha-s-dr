<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import { broadOpenState } from './utils';
	import clsx from 'clsx';
</script>

<Dialog.Root open={true} onOpenChange={broadOpenState}>
	<Dialog.Trigger class={clsx('amazing-button', buttonVariants({ variant: 'outline' }))}
		>Какие-то условные правила</Dialog.Trigger
	>
	<Dialog.Content class="max-w-5xl p-16">
		<Dialog.Title class="text-center text-8xl font-black">С прошедшим!</Dialog.Title>
		<p class="text-md mt-6 text-center">
			Играла в Алхимию? Ничего страшного, если не играла - всё бывает в первый раз.
			<br />Вот какое-то условное описание игрового процесса, которое мы только что придумали:
		</p>
		<ul class="mx-28 mb-12 list-inside list-disc">
			<li>Игра начинается с нескольких базовых элементов (внизу)</li>
			<li>Выбирай по два элемента и комбинируй их, чтобы создать новый элемент</li>
			<li>
				Каждый новый элемент может быть использован для дальнейших комбинаций <span
					class="font-black">только один раз</span
				>
			</li>
			<li>
				Не все комбинации приводят к созданию нового элемента. Если комбинация не работает - не
				знаю, у меня локально всё работало (на самом деле нет, пробуй другую комбинацию)
			</li>
			<li>Если хочешь отчистить поле - нажми на корзину справа внизу</li>
			<li>
				Иногда мы будем подкидывать тебе новые элементы (также внизу; они будут отмечены как-нибудь)
			</li>
			<li>В блоке “История комбинаций” ты можешь узнать причину замеса!</li>
		</ul>
		<p class="text-center font-black">Удачи в создании новых элементов и открытии тайн алхимии!</p>
	</Dialog.Content>
</Dialog.Root>
