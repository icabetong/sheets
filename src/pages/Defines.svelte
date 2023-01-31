<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import { ChevronLeft } from '@steeze-ui/heroicons'
	import { pop } from 'svelte-spa-router'
	import Page from '$lib/page/Page.svelte'
	import { defines } from '$stores/defines'
	import ChipInput from '$lib/chip-input/ChipInput.svelte'

	const onProductAdd = ({ detail }: CustomEvent) => {
		const products = $defines.products
		products.push(detail)
		$defines.products = [...products]
	}
	const onProductRemove = ({ detail }: CustomEvent) => {
		$defines.products = $defines.products.filter((p) => p !== detail)
	}

	const onDescriptionAdd = ({ detail }: CustomEvent) => {
		const descriptions = $defines.descriptions
		descriptions.push(detail)
		$defines.descriptions = [...descriptions]
	}
	const onDescriptionRemove = ({ detail }: CustomEvent) => {
		$defines.descriptions = $defines.descriptions.filter((p) => p !== detail)
	}
</script>

<Page>
	<div class="sticky top-0 flex items-center bg-white py-8 dark:bg-gray-800">
		<button on:click={pop}>
			<Icon src={ChevronLeft} class="mr-4 h-6 w-6" />
		</button>
		<h1 class="header flex-1">Defines</h1>
	</div>
	<div class="relative mt-4 overflow-x-auto">
		<form>
			<div class="form-group">
				<label for="fee" class="form-label">Fee</label>
				<input type="text" id="fee" class="form-input" bind:value={$defines.fee} />
			</div>
			<div class="form-group">
				<label for="discount" class="form-label">Discount</label>
				<input type="text" id="discount" class="form-input" bind:value={$defines.discount} />
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
		</form>
	</div>
</Page>
