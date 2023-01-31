<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import DefineRow from './define-row/DefineRow.svelte'

	const dispatcher = createEventDispatcher<{ select: Define; remove: Define }>()
	const select = (e: CustomEvent<Define>) => dispatcher('select', e.detail)
	const remove = (e: CustomEvent<Define>) => dispatcher('remove', e.detail)

	export let defines: Define[]
</script>

<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
	<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
		<tr>
			<th scope="col" class="px-6 py-3"> Name </th>
			<th scope="col" class="px-6 py-3"> Price </th>
			<th scope="col" class="px-6 py-3">
				<span class="sr-only">Actions</span>
			</th>
		</tr>
	</thead>
	<tbody>
		{#each defines as define}
			<DefineRow {define} on:select={select} on:remove={remove} />
		{/each}
	</tbody>
</table>
