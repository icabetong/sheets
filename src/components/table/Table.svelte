<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import EntryRow from './row/Row.svelte'

	const dispatcher = createEventDispatcher<{ select: Entry; remove: Entry }>()
	const select = (e: CustomEvent<Entry>) => dispatcher('select', e.detail)
	const remove = (e: CustomEvent<Entry>) => dispatcher('remove', e.detail)

	export let entries: Entry[]
</script>

{#if entries.length > 0}
	<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Customer </th>
				<th scope="col" class="px-6 py-3"> Product </th>
				<th scope="col" class="px-6 py-3"> Description </th>
				<th scope="col" class="px-6 py-3"> Amount </th>
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody class="w-full">
			{#each entries as entry}
				<EntryRow {entry} on:select={select} on:remove={remove} />
			{/each}
		</tbody>
	</table>
{:else}
	<div class="flex flex-col items-center py-8">
		<h2 class="text-xl font-semibold">No Entries</h2>
	</div>
{/if}
