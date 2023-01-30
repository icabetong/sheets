<script lang="ts">
	import { fly } from 'svelte/transition'
	import { XMark } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	export let show: boolean
	export let title: string
	export let onDismiss: () => void
</script>

{#if show}
	<div
		class="fixed top-0 right-0 flex h-full w-80 flex-col overflow-y-auto border-l border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
		transition:fly={{ x: 320, opacity: 1 }}>
		<div class="mb-8 flex items-center">
			<h6 class="flex-1 text-xl font-semibold">{title}</h6>
			<button
				type="button"
				class="rounded hover:bg-gray-200 dark:hover:bg-gray-700"
				on:click={onDismiss}>
				<Icon src={XMark} class="h-6 w-6" />
			</button>
		</div>
		<slot />
	</div>
{/if}
