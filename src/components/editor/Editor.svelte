<script lang="ts">
	import Sidebar from '$lib/sidebar/Sidebar.svelte'
	import { createForm } from 'svelte-forms-lib'

	export let entry: Entry | null = null
	export let show: boolean
	export let onDismiss: () => void

	const { form, errors, handleSubmit, state } = createForm<EntryCore>({
		initialValues: {
			customer: entry?.customer ?? '',
			product: entry?.product ?? '',
			description: entry?.description ?? '',
			amount: entry?.amount ?? 0
		},
		validate: (values) => {
			let errors: EntryFormError = {}

			if (values.customer?.trim() === '') errors.customer = 'Customer is required'
			if (values.product.trim() === '') errors.product = 'Product is required'
			if (values.description?.trim() === '') errors.description = 'Description is required'
			if (values.amount <= 0) errors.amount === 'Amount should be greater than 0'

			return errors
		},
		onSubmit: async (form) => {}
	})
</script>

<Sidebar {show} {onDismiss} title={entry ? 'Edit Entry' : 'Create Entry'}>
	<form class="flex flex-1 flex-col" on:submit={handleSubmit}>
		<div class="flex-1">
			<div class="form-group">
				<label for="customer" class="form-label">Customer</label>
				<input
					type="text"
					id="customer"
					class="form-input"
					placeholder="Erich von Manstein"
					class:error={$errors.customer}
					bind:value={$form.customer} />
			</div>
			<div class="form-group">
				<label for="product" class="form-label">Product</label>
				<input
					type="text"
					id="product"
					class="form-input"
					placeholder="Globe Telecom"
					class:error={$errors.product}
					bind:value={$form.product} />
			</div>
			<div class="form-group">
				<label for="description" class="form-label">Description</label>
				<input
					type="text"
					id="description"
					class="form-input"
					placeholder="Regular Load"
					class:error={$errors.description}
					bind:value={$form.description} />
			</div>
			<div class="form-group">
				<label for="amount" class="form-label">Amount</label>
				<input
					type="number"
					id="amount"
					class="form-input"
					class:error={$errors.amount}
					bind:value={$form.amount} />
			</div>
		</div>
		{#if $state.isModified}
			<button type="submit" class="button-primary"> Save </button>
		{/if}
	</form>
</Sidebar>

<style lang="postcss">
	.error {
		@apply border-red-500 text-red-500 focus:border-red-500 !important;
	}
</style>
