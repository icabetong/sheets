<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import { Trash } from '@steeze-ui/heroicons'
	import { createEventDispatcher } from 'svelte'
	import { getCurrencyFormatter } from '$shared/formatter'

	const dispatcher = createEventDispatcher<{ select: Define; remove: Define }>()
	const select = () => dispatcher('select', define)
	const remove = () => dispatcher('remove', define)

	const formatter = getCurrencyFormatter(true)
	export let define: Define

	const onHandleRemove = (e: Event) => {
		e.stopPropagation()
		remove()
	}
</script>

<tr
	class="cursor-pointer border-b bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-gray-600"
	on:click={select}>
	<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
		{define.name}
	</th>
	<td class="px-6 py-4">
		{#if define.discountedPrice}
			<span class="mr-1 line-through">{formatter.format(define.price)}</span>
			<span class="font-medium">{formatter.format(define.discountedPrice)}</span>
		{:else}
			{formatter.format(define.price)}
		{/if}
	</td>
	<td class="py-4">
		<button type="button" on:click={onHandleRemove}>
			<Icon src={Trash} class="h-4 w-4" />
		</button>
	</td>
</tr>
