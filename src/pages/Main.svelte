<script lang="ts">
	import Card from '$components/card/Card.svelte'
	import EntryEditor from '$components/entry-editor/EntryEditor.svelte'
	import EntryTable from '$components/entry-table/EntryTable.svelte'
	import { entries } from '$stores/entries'
	import { defines } from '$stores/defines'
	import { MagnifyingGlass, Plus } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { confirm } from '@tauri-apps/api/dialog'
	import { getCurrencyFormatter } from '$shared/formatter'
	import { search } from '$shared/searcher'
	import Header from '$components/header/Header.svelte'
	import Page from '$lib/page/Page.svelte'
	import { deposits } from '$stores/deposits'

	const formatter = getCurrencyFormatter(true)
	let data = $entries
	let show = false
	let entry: Entry | null = null
	let sold = 0
	let profits = 0
	let cash = 0
	let deposited = 0
	let query = ''

	$: {
		if (query.trim().length > 0) {
			data = search($entries, query)
		} else data = $entries
	}

	$: {
		const discount = $defines.discount
		const rate = discount * 0.01

		deposited = $deposits.reduce((acc, deposit) => acc + deposit.amount, 0)
		profits = $entries.reduce((acc, entry) => acc + (entry.amount * rate + $defines.fee), 0)
		sold = $entries.reduce((acc, entry) => acc + entry.amount, 0)
		cash = sold + $entries.length * $defines.fee - deposited
	}

	const onTableSelect = ({ detail }: CustomEvent<Entry>) => {
		entry = detail
		show = true
	}
	const onTableRemove = async ({ detail }: CustomEvent<Entry>) => {
		const confirmed = await confirm('Are you sure you want to delete this entry?')

		if (confirmed) {
			$entries = $entries.filter((e) => e.id !== detail.id)
		}
	}
	const onEditorCreate = () => {
		entry = null
		show = true
	}
	const onEditorSubmit = ({ detail }: CustomEvent<Entry>) => {
		let newEntries = Array.from($entries)
		const index = newEntries.findIndex((e) => e.id === detail.id)

		if (index >= 0) newEntries[index] = detail
		else newEntries.push(detail)

		$entries = newEntries
	}
</script>

<Page>
	<Header title="Sales">
		<button class="button-primary flex items-center px-4" on:click={onEditorCreate}>
			<Icon src={Plus} class="mr-2 h-6 w-6" />
			<span>Create</span>
		</button>
	</Header>
	<div class="flex h-full flex-col">
		<div class="mb-6 grid grid-cols-4 gap-4">
			<Card title="Amount Sold" value={formatter.format(sold)} />
			<Card title="Profits" value={formatter.format(profits)} />
			<Card title="Cash-in-Hand" value={formatter.format(cash)} />
			<Card title="Deposited" value={formatter.format(deposited)} />
		</div>
		<div class="flex items-center justify-end">
			<div>
				<label for="table-search" class="sr-only">Search</label>
				<div class="relative">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Icon src={MagnifyingGlass} class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</div>
					<input
						type="text"
						id="table-search"
						class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						placeholder="Search for entries"
						bind:value={query} />
				</div>
			</div>
		</div>
		<div class="relative mt-4 overflow-x-auto">
			<EntryTable entries={data} on:select={onTableSelect} on:remove={onTableRemove} />
		</div>
	</div>
</Page>
{#if show}
	<EntryEditor {show} {entry} on:dismiss={() => (show = !show)} on:submit={onEditorSubmit} />
{/if}
