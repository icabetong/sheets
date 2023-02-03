<script lang="ts">
	import Sidebar from '$lib/sidebar/Sidebar.svelte'
	import { createForm } from 'svelte-forms-lib'
	import { createEventDispatcher } from 'svelte'
	import { randomId } from '$shared/tools'

	const dispatcher = createEventDispatcher<{ dismiss: void; submit: Deposit }>()
	const dismiss = () => dispatcher('dismiss')

	export let deposit: Deposit | null
	export let show: boolean

	const { form, errors, state, handleSubmit } = createForm<DepositCore>({
		initialValues: {
			bank: deposit?.bank ?? '',
			amount: deposit?.amount ?? 0
		},
		validate: (values) => {
			let errors: DepositFormError = {}

			if (values.bank.trim() === '') errors.bank = 'Bank is Required'
			if (values.amount <= 0) errors.amount = 'Amount should be above 0'

			return errors
		},
		onSubmit: (form) => {
			dispatcher('submit', {
				...form,
				id: deposit !== null ? deposit.id : randomId(),
				timestamp: deposit !== null ? deposit.timestamp : Date.now()
			})
			dismiss()
		}
	})
</script>

<Sidebar {show} on:dismiss={dismiss} title={deposit ? 'Edit Deposit' : 'Create Deposit'}>
	<form class="flex flex-1 flex-col" on:submit={handleSubmit}>
		<div class="flex-1">
			<div class="form-group">
				<label for="bank" class="form-label">Bank</label>
				<input
					type="text"
					id="bank"
					class="form-input"
					placeholder="Bank of Evil"
					class:error={$errors.bank}
					bind:value={$form.bank} />
			</div>
			<div class="form-group">
				<label for="amount" class="form-label">Amount</label>
				<div class="flex">
					<span
						class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
						₱
					</span>
					<input
						type="number"
						id="amount"
						class="form-input rounded-l-none rounded-r-md"
						class:error={$errors.amount}
						bind:value={$form.amount} />
				</div>
			</div>
		</div>
		{#if $state.isModified}
			<button type="submit" class="button-primary">Save</button>
		{/if}
	</form>
</Sidebar>

<style lang="postcss">
	.error {
		color: theme(colors.red.500) !important;
		border-color: theme(borderColor.red.500) !important;
	}
</style>
