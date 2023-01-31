<script lang="ts">
	import Header from '$components/header/Header.svelte'
	import Page from '$lib/page/Page.svelte'
	import { defines } from '$stores/defines'
	import ChipInput from '$lib/chip-input/ChipInput.svelte'

	const onProductAdd = ({ detail }: CustomEvent) => {
		const products = $defines.products
		products.push(detail.trim())
		$defines.products = [...products]
	}
	const onProductRemove = ({ detail }: CustomEvent) => {
		$defines.products = $defines.products.filter((p) => p !== detail)
	}

	const onDescriptionAdd = ({ detail }: CustomEvent) => {
		const descriptions = $defines.descriptions
		descriptions.push(detail.trim())
		$defines.descriptions = [...descriptions]
	}
	const onDescriptionRemove = ({ detail }: CustomEvent) => {
		$defines.descriptions = $defines.descriptions.filter((p) => p !== detail)
	}
</script>

<Page>
	<Header title="Defines" showBack />
	<div class="relative mt-4 overflow-x-auto">
		<div class="flex items-center space-x-4">
			<div class="form-group">
				<label for="fee" class="form-label">Fee</label>
				<div class="flex">
					<span
						class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
						₱
					</span>
					<input
						type="number"
						id="fee"
						class="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						bind:value={$defines.fee} />
				</div>
			</div>
			<div class="form-group">
				<label for="discount" class="form-label">Discount</label>
				<div class="flex">
					<input
						type="number"
						id="discount"
						class="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						bind:value={$defines.discount} />
					<span
						class="inline-flex items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
						%
					</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label for="products" class="form-label">Products</label>
			<ChipInput chips={$defines.products} on:add={onProductAdd} on:remove={onProductRemove} />
		</div>
		<div class="form-group">
			<label for="descriptions" class="form-label">Descriptions</label>
			<ChipInput
				chips={$defines.descriptions}
				on:add={onDescriptionAdd}
				on:remove={onDescriptionRemove} />
		</div>
	</div>
</Page>
