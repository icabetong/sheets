<script lang="ts">
	import { createForm } from 'svelte-forms-lib'
	import { createEventDispatcher } from 'svelte'
	import { randomId } from '$shared/tools'
	import Sidebar from '$lib/sidebar/Sidebar.svelte'

	const dispatcher = createEventDispatcher<{ dismiss: void; submit: Define }>()
	const dismiss = () => dispatcher('dismiss')

	export let define: Define | null = null
	export let show: boolean

	const { form, errors, handleSubmit, state } = createForm<DefineCore>({
		initialValues: {
			name: define?.name ?? '',
			price: define?.price ?? 0,
			discountedPrice: define?.price ?? 0
		},
		validate: (values) => {
			let errors: DefineFormError = {}

			if (values.name.trim() === '') errors.name = 'Name is required'
			if (values.price <= 0) errors.price = 'Price should be above 0'

			return errors
		},
		onSubmit: (form) => {
			dispatcher('submit', { ...form, id: define !== null ? define.id : randomId() })
			dismiss()
		}
	})
</script>

<Sidebar {show} on:dismiss={dismiss} title={define ? 'Edit Define' : 'Create Define'}>
	<form class="flex flex-1 flex-col" on:submit={handleSubmit}>
		<div class="flex-1">
			<div class="form-group">
				<label for="name" class="form-label">Name</label>
				<input
					type="text"
					id="name"
					class="form-input"
					class:error={$errors.name}
					bind:value={$form.name} />
			</div>
			<div class="form-group">
				<label for="price" class="form-label">Price</label>
				<input
					type="number"
					id="price"
					class="form-input"
					class:error={$errors.price}
					bind:value={$form.price} />
			</div>
			<div class="form-group">
				<label for="discountedPrice" class="form-label">Discounted Price</label>
				<input
					type="number"
					id="discountedPrice"
					class="form-input"
					class:error={$errors.discountedPrice}
					bind:value={$form.discountedPrice} />
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
