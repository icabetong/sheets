<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import { ChevronLeft } from '@steeze-ui/heroicons'
	import { pop } from 'svelte-spa-router'

	export let showBack: boolean = false
	export let title: string
</script>

<div class="sticky top-0 flex items-center bg-white py-8 dark:bg-gray-800">
	{#if showBack}
		<button on:click={pop}>
			<Icon src={ChevronLeft} class="mr-4 h-6 w-6" />
		</button>
	{/if}
	<h1 class="header flex-1">{title}</h1>
	<slot />
</div>
