<script>
	import { createEventDispatcher } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { ChevronDown } from '@steeze-ui/heroicons'
	import { createPopperActions } from 'svelte-popperjs'
	import { clickOutside } from '$shared/directives/click-outside'

	const dispatcher = createEventDispatcher()
	const select = (value) => dispatcher('select', value)

	export let value
	export let options
	export let placeholder = ''

	let open = false
	const [dropdownRef, dropdownContent] = createPopperActions({
		placement: 'bottom-start'
	})
	const extraOptions = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	}

	const onOptionsSelect = (event) => {
		open = false
		select(event)
	}
</script>

<button
	use:dropdownRef
	type="button"
	id="dropdownToggleButton"
	data-dropdown-toggle="dropdownToggle"
	class="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
	on:click={() => (open = !open)}>
	<span class="flex-1 text-start" class:text-gray-400={!value}>
		{value ? value : placeholder}
	</span>
	<Icon src={ChevronDown} class="ml-2 h-4 w-4" theme="mini" />
</button>

<!-- Dropdown menu -->
{#if open}
	<div
		use:clickOutside
		use:dropdownContent={extraOptions}
		on:clickOutside={() => (open = !open)}
		id="dropdownToggle"
		class="z-30 w-72 divide-y divide-gray-100 rounded bg-white drop-shadow dark:bg-gray-600 ">
		<ul
			class="space-y-1 text-sm text-gray-700 dark:text-gray-50"
			aria-labelledby="dropdownToggleButton">
			{#each options as option}
				<li
					class="cursor-pointer rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500"
					on:click={() => onOptionsSelect(option)}
					on:keydown={null}>
					{option}
				</li>
			{/each}
		</ul>
	</div>
{/if}
