<script lang="ts">
	import { window, os } from '@tauri-apps/api'
	import { onMount } from 'svelte'
	import Main from './pages/Main.svelte'
	import { darkTheme } from './stores/theme'

	onMount(async () => {
		let hostOS = await os.type()
		if (hostOS === 'Linux') $darkTheme = true
		else $darkTheme = (await window.appWindow.theme()) === 'dark'

		if ($darkTheme) document.body.classList.add('dark')
		else document.body.classList.remove('dark')
	})
</script>

<Main />

<style lang="postcss">
	:global(body) {
		@apply bg-white;
	}
	:global(body.dark) {
		@apply bg-gray-800;
	}
</style>
