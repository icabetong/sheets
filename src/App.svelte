<script lang="ts">
	import { BaseDirectory, createDir, exists, readDir, readTextFile } from '@tauri-apps/api/fs'
	import { window, os } from '@tauri-apps/api'
	import { open } from '@tauri-apps/api/dialog'
	import { dataDir, documentDir } from '@tauri-apps/api/path'
	import { onMount } from 'svelte'
	import Main from '$pages/Main.svelte'
	import Defines from '$pages/Defines.svelte'
	import Preferences from '$pages/Preferences.svelte'
	import Modal from '$lib/modal/Modal.svelte'
	import { darkTheme } from './stores/theme'
	import Router, { push } from 'svelte-spa-router'
	import { entries } from '$stores/entries'
	import { defines } from '$stores/defines'
	import { onReadContent, onWriteContent } from '$shared/storage'

	let show = false
	onMount(async () => {
		let hostOS = await os.type()
		if (hostOS === 'Linux') $darkTheme = true
		else $darkTheme = (await window.appWindow.theme()) === 'dark'

		if ($darkTheme) document.body.classList.add('dark')
		else document.body.classList.remove('dark')

		await onPrepareDataStorage()
	})

	const dir = BaseDirectory.AppData
	const onCreateStorage = async () => {
		await createDir('data', {
			dir,
			recursive: true
		})
	}

	const onPrepareDataStorage = async () => {
		try {
			let fileExists = await exists('entries.json', { dir })
			if (!fileExists) {
				await onCreateStorage()
				await onWriteContent('entries.json', [])
			}
			if (!fileExists) {
				await onWriteContent('defines.json', {
					fee: 3,
					discount: 0,
					products: [],
					descriptions: []
				})
			}

			let parsedEntries: Entry[] = await onReadContent<Entry[]>('entries.json')
			entries.set(parsedEntries)

			let parsedDefines: Define = await onReadContent<Define>('defines.json')
			defines.set(parsedDefines)
		} catch (e) {
			console.error(e)
		}
	}

	const onWriteData = async () => {
		await onWriteContent('entries.json', $entries)
		await onWriteContent('defines.json', $defines)
	}

	window.appWindow.onCloseRequested(onWriteData)
	window.appWindow.onMenuClicked(({ payload }) => {
		switch (payload) {
			case 'defines':
			case 'preferences':
				push(`/${payload}`)
				break
			case 'save':
				onWriteData()
				break
			case 'about':
				show = true
				break
		}
	})

	const routes = {
		'/': Main,
		'/defines': Defines,
		'/preferences': Preferences
	}
</script>

<Router {routes} />
<Modal {show} width="sm" on:dismiss={() => (show = !show)}>
	<div class="flex flex-col items-center justify-center">
		<img src="images/icon.png" alt="application icon" class="h-16 w-16" width="64" height="64" />
		<h2 class="text-xl font-semibold">Sheets</h2>
		<p class="mb-4 text-sm text-gray-500">© 2022 Isaiah Collins Abetong</p>
		<button class="button-primary" on:click={() => (show = !show)}>Close</button>
	</div>
</Modal>

<style lang="postcss">
	:global(body) {
		@apply bg-white;
	}
	:global(body.dark) {
		@apply bg-gray-800;
	}
</style>
