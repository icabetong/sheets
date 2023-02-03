<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import DepositRow from './deposit-row/DepositRow.svelte'

	const dispatcher = createEventDispatcher<TableEvents<Deposit>>()
	const select = (e: CustomEvent<Deposit>) => dispatcher('select', e.detail)
	const remove = (e: CustomEvent<Deposit>) => dispatcher('remove', e.detail)

	export let deposits: Deposit[]
</script>

{#if deposits.length > 0}
	<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Timestamp </th>
				<th scope="col" class="px-6 py-3"> Bank </th>
				<th scope="col" class="px-6 py-3"> Amount </th>
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody class="w-full">
			{#each deposits as deposit}
				<DepositRow {deposit} on:select={select} on:remove={remove} />
			{/each}
		</tbody>
	</table>
{:else}
	<div class="flex flex-col items-center py-8">
		<h2 class="text-xl font-semibold">No Deposits</h2>
	</div>
{/if}
