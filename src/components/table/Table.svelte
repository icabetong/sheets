<script lang="ts">
	import EntryRow from './row/Row.svelte'

	export let entries: Entry[]
</script>

<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
	<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
		<tr>
			<th scope="col" class="px-6 py-3"> Customer </th>
			<th scope="col" class="px-6 py-3"> Product </th>
			<th scope="col" class="px-6 py-3"> Description </th>
			<th scope="col" class="px-6 py-3"> Amount </th>
		</tr>
	</thead>
	<tbody>
		{#each entries as entry}
			<EntryRow {entry} />
		{/each}
	</tbody>
</table>
