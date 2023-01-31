<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import { ChevronDown } from '@steeze-ui/heroicons'
	import { createPopperActions } from 'svelte-popperjs'
	import { clickOutside } from '$shared/directives/click-outside'

	export let options: string[] = []
	let isOpen = false
	const [dropdownRef, dropdownContent] = createPopperActions({
		placement: 'bottom-start'
	})
	const extraOptions = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	}
</script>

<button
	use:dropdownRef
	type="button"
	id="dropdownToggleButton"
	data-dropdown-toggle="dropdownToggle"
	class="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-blue-700 hover:drop-shadow-md focus:outline-none focus:ring-4 focus:ring-red-300"
	on:click={() => (isOpen = !isOpen)}>
	Options
	<Icon src={ChevronDown} class="ml-2 h-4 w-4" theme="mini" />
</button>

<!-- Dropdown menu -->
{#if isOpen}
	<div
		use:clickOutside
		use:dropdownContent={extraOptions}
		on:clickOutside={() => (isOpen = !isOpen)}
		id="dropdownToggle"
		class="z-30 w-72 divide-y divide-gray-100 rounded bg-white drop-shadow">
		<ul class="space-y-1 p-3 text-sm text-gray-700" aria-labelledby="dropdownToggleButton">
			{#each options as option}
				<li>{option}</li>
			{/each}
		</ul>
	</div>
{/if}
