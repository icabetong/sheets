<script lang="ts">
	import { getCurrencyFormatter } from '$shared/formatter'

	const formatter = getCurrencyFormatter(true)
	export let entry: Entry
</script>

<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
	<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
		{entry.customer}
	</th>
	<td class="px-6 py-4"> {entry.product} </td>
	<td class="px-6 py-4"> {entry.description} </td>
	<td class="px-6 py-4"> {formatter.format(entry.amount)} </td>
</tr>
