<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { getCurrencyFormatter, getDateTimeFormatter } from '$shared/formatter'

	export let deposit: Deposit

	const dispatcher = createEventDispatcher<TableEvents<Deposit>>()
	const select = () => dispatcher('select', deposit)
	const remove = () => dispatcher('remove', deposit)

	const currencyFormatter = getCurrencyFormatter(true)
	const dateTimeFormatter = getDateTimeFormatter('medium')
</script>

<tr
	class="border-b bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-gray-600"
	on:click={select}>
	<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
		{dateTimeFormatter.format(new Date(deposit.timestamp))}
	</th>
	<td class="px-6 py-4">{deposit.bank}</td>
	<td class="px-6 py-4"> {currencyFormatter.format(deposit.amount)} </td>
	<td class="py-2">
		<button
			type="button"
			class="rounded p-2 text-sm font-medium text-red-500 hover:underline"
			on:click|stopPropagation={remove}>
			Remove
		</button>
	</td>
</tr>
