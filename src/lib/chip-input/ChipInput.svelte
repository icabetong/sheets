<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { createEventDispatcher } from 'svelte'

	const dispatcher = createEventDispatcher<{ add: string; remove: string }>()

	export let chips: string[]
	let inputValue = ''

	const onHandleKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'Space' || e.code === 'Enter') {
			dispatcher('add', inputValue)
			inputValue = ''
		}
	}
</script>

<div class="form-input flex items-center py-1.5 focus-within:border-blue-500">
	{#if chips.length > 0}
		<ul class="mr-2 flex items-center space-x-1">
			{#each chips as chip}
				<li
					class="flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
					<span>{chip}</span>
					<button
						type="button"
						class="ml-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
						on:click={() => dispatcher('remove', chip)}>
						<Icon src={XMark} class="h-4 w-4" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}
	<input
		type="text"
		id="core-input"
		class="flex-1 bg-gray-50 py-1.5 focus:outline-none dark:bg-gray-700"
		on:keydown={onHandleKeyDown}
		bind:value={inputValue} />
</div>
