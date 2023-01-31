<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import { ChevronLeft } from '@steeze-ui/heroicons'
	import Switch from '$lib/switch/Switch.svelte'
	import { pop } from 'svelte-spa-router'
	import { onMount } from 'svelte'
	import Page from '$lib/page/Page.svelte'

	let darkModeEnabled: boolean
	onMount(() => {
		darkModeEnabled = document.body.classList.contains('dark')
	})

	const onToggleDarkMode = () => {
		document.body.classList.toggle('dark')
	}
</script>

<Page>
	<div class="sticky top-0 flex items-center bg-white py-8 dark:bg-gray-800">
		<button on:click={pop}>
			<Icon src={ChevronLeft} class="mr-4 h-6 w-6" />
		</button>
		<h1 class="header">Preferences</h1>
	</div>
	<div class="mt-2">
		<Switch checked={darkModeEnabled} label="Dark Mode" on:change={onToggleDarkMode} />
	</div>
</Page>
