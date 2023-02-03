<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import { Plus, MagnifyingGlass } from '@steeze-ui/heroicons'
	import Header from '$components/header/Header.svelte'
	import Page from '$lib/page/Page.svelte'
	import DepositEditor from '$components/deposit-editor/DepositEditor.svelte'
	import DepositTable from '$components/deposit-table/DepositTable.svelte'
	import { deposits } from '$stores/deposits'
	import { confirm } from '@tauri-apps/api/dialog'
	import { search } from '$shared/searcher'

	let data = $deposits
	let show = false
	let deposit: Deposit | null = null
	let query = ''

	$: {
		if (query.trim().length > 0) {
			data = search($deposits, query)
		} else data = $deposits
	}

	const onTableSelect = ({ detail }: CustomEvent<Deposit>) => {
		deposit = detail
		show = true
	}
	const onTableRemove = async ({ detail }: CustomEvent<Deposit>) => {
		const confirmed = await confirm('Are you sure you want to delete this deposit?')

		if (confirmed) {
			$deposits = $deposits.filter((d) => d.id !== detail.id)
		}
	}
	const onEditorCreate = () => {
		show = true
	}
	const onEditorSubmit = ({ detail }: CustomEvent<Deposit>) => {
		let newDeposits = Array.from($deposits)
		const index = newDeposits.findIndex((d) => d.id === detail.id)

		if (index >= 0) newDeposits[index] = detail
		else newDeposits.push(detail)

		$deposits = newDeposits
	}
</script>

<Page>
	<Header title="Deposits" showBack>
		<button class="button-primary flex items-center px-4" on:click={onEditorCreate}>
			<Icon src={Plus} class="mr-2 h-6 w-6" />
			<span>Add</span>
		</button>
	</Header>
	<div class="flex h-full flex-col">
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
						placeholder="Search for deposits"
						bind:value={query} />
				</div>
			</div>
		</div>
		<div class="relative mt-4 overflow-x-auto">
			<DepositTable deposits={data} on:select={onTableSelect} on:remove={onTableRemove} />
		</div>
	</div>
</Page>
{#if show}
	<DepositEditor {show} {deposit} on:dismiss={() => (show = !show)} on:submit={onEditorSubmit} />
{/if}
