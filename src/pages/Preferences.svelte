<script lang="ts">
	import Header from '$components/header/Header.svelte'
	import Switch from '$lib/switch/Switch.svelte'
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
	<Header title="Preferences" showBack />
	<div class="mt-2">
		<Switch checked={darkModeEnabled} label="Dark Mode" on:change={onToggleDarkMode} />
	</div>
</Page>
