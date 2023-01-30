<script lang="ts">
	import Card from '$components/card/Card.svelte'
	import Editor from '$components/editor/Editor.svelte'
	import Table from '$components/table/Table.svelte'
	import { MagnifyingGlass, Plus } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	let show = false
	let entry: Entry | null = null

	let entries: Entry[] = [
		{ id: 'K', customer: 'Teddy', product: 'Regular', description: 'Globe', amount: 8 },
		{ id: 'K', customer: 'Teddy', product: 'Regular', description: 'Globe', amount: 8 },
		{ id: 'K', customer: 'Teddy', product: 'Regular', description: 'Globe', amount: 8 },
		{ id: 'K', customer: 'Teddy', product: 'Regular', description: 'Globe', amount: 8 },
		{ id: 'K', customer: 'Teddy', product: 'Regular', description: 'Globe', amount: 8 },
		{ id: 'K', customer: 'Teddy', product: 'Regular', description: 'Globe', amount: 8 }
	]
</script>

<div class="page">
	<div class="sticky top-0 flex items-center bg-white py-8 dark:bg-gray-800">
		<h1 class="header flex-1">Sales</h1>
		<button class="button-primary flex items-center py-1.5 px-4" on:click={() => (show = !show)}>
			<Icon src={Plus} class="mr-2 h-6 w-6" />
			<span>Create</span>
		</button>
	</div>
	<div class="overflow-scroll">
		<div class="mb-6 grid grid-cols-3 gap-4">
			<Card title="Amount Sold" value="80PHP" />
			<Card title="Profits" value="80PHP" />
			<Card title="Cash-in-Hand" value="80PHP" />
		</div>
		<div class="flex items-center justify-end">
			<label for="table-search" class="sr-only">Search</label>
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<Icon src={MagnifyingGlass} class="h-5 w-5 text-gray-500 dark:text-gray-400" />
				</div>
				<input
					type="text"
					id="table-search-users"
					class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Search for users" />
			</div>
		</div>
		<div class="relative mt-4 overflow-x-auto">
			<Table {entries} />
		</div>
	</div>
</div>
<Editor {show} {entry} onDismiss={() => (show = false)} />
