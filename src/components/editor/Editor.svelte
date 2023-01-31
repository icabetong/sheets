<script lang="ts">
	import Sidebar from '$lib/sidebar/Sidebar.svelte'
	import { createForm } from 'svelte-forms-lib'
	import { createEventDispatcher } from 'svelte'
	import { randomId } from '$shared/tools'
	import { defines } from '$stores/defines'

	const dispatcher = createEventDispatcher<{ dismiss: void; submit: Entry }>()
	const dismiss = () => dispatcher('dismiss')

	export let entry: Entry | null = null
	export let show: boolean

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
		onSubmit: (form) => {
			dispatcher('submit', {
				...form,
				id: entry !== null ? entry.id : randomId(),
				timestamp: Date.now()
			})
			dismiss()
		}
	})
</script>

<Sidebar {show} on:dismiss={dismiss} title={entry ? 'Edit Entry' : 'Create Entry'}>
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
				{#if $defines.products.length > 0}
					<select id="product" class="form-select" bind:value={$form.product}>
						<option>Choose one</option>
						{#each $defines.products as product}
							<option value={product}>{product}</option>
						{/each}
					</select>
				{:else}
					<input
						type="text"
						id="product"
						class="form-input"
						placeholder="Globe Telecom"
						class:error={$errors.product}
						bind:value={$form.product} />
				{/if}
			</div>
			<div class="form-group">
				<label for="description" class="form-label">Description</label>
				{#if $defines.descriptions.length > 0}
					<select id="description" class="form-select" bind:value={$form.description}>
						<option>Choose one</option>
						{#each $defines.descriptions as desc}
							<option value={desc}>{desc}</option>
						{/each}
					</select>
				{:else}
					<input
						type="text"
						id="description"
						class="form-input"
						placeholder="Regular"
						class:error={$errors.description}
						bind:value={$form.description} />
				{/if}
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
