<script lang="ts">
	import { open } from '@tauri-apps/api/dialog'
	import { BaseDirectory, exists, readTextFile } from '@tauri-apps/api/fs'
	import { window, os } from '@tauri-apps/api'
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
	import { parseFromCSV } from '$shared/parser'
	import { isDev, randomId } from '$shared/tools'
	import { deposits } from '$stores/deposits'
	import Deposits from '$pages/Deposits.svelte'

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
	const onPrepareDataStorage = async () => {
		try {
			const dev = isDev() ? '-dev' : ''
			let fileExists = await exists(`entries${dev}.json`, { dir })
			if (!fileExists) {
				await onWriteContent(`entries.json`, [])
			}
			fileExists = await exists(`defines${dev}.json`, { dir })

			if (!fileExists) {
				await onWriteContent(`defines.json`, {
					fee: 3,
					discount: 0,
					products: [],
					descriptions: []
				})
			}

			fileExists = await exists(`deposits${dev}.json`, { dir })
			if (!fileExists) {
				await onWriteContent(`deposits.json`, [])
			}

			let parsedEntries: Entry[] = await onReadContent<Entry[]>(`entries.json`)
			entries.set(parsedEntries)

			let parsedDefines: Define = await onReadContent<Define>(`defines.json`)
			defines.set(parsedDefines)

			let parsedDeposits: Deposit[] = await onReadContent<Deposit[]>(`deposits.json`)
			deposits.set(parsedDeposits)
		} catch (e) {
			console.error(e)
		}
	}

	const onWriteData = async () => {
		await onWriteContent('entries.json', $entries)
		await onWriteContent('defines.json', $defines)
		await onWriteContent('deposits.json', $deposits)
	}

	const onImportData = async () => {
		const path = await open()
		if (Array.isArray(path) || !path) return

		const source = await readTextFile(path)
		$entries = $entries.concat(
			parseFromCSV<Entry>(source, (values: string[]) => ({
				customer: values[0],
				product: values[1],
				description: values[2],
				amount: parseInt(values[3]),
				timestamp: Date.parse(values[4]),
				id: randomId()
			}))
		)
		await onWriteContent('entries.json', $entries)
	}

	window.appWindow.onCloseRequested(onWriteData)
	window.appWindow.onMenuClicked(({ payload }) => {
		switch (payload) {
			case 'defines':
			case 'deposits':
			case 'preferences':
				push(`/${payload}`)
				break
			case 'save':
				onWriteData()
				break
			case 'import':
				onImportData()
				break
			case 'about':
				show = true
				break
		}
	})

	const routes = {
		'/': Main,
		'/defines': Defines,
		'/deposits': Deposits,
		'/preferences': Preferences
	}
</script>

<Router {routes} />
<Modal {show} width="sm" on:dismiss={() => (show = !show)}>
	<div class="flex flex-col items-center justify-center">
		<img src="images/icon.png" alt="application icon" class="h-16 w-16" width="64" height="64" />
		<h2 class="text-xl font-semibold">Sheets</h2>
		<p class="mb-4 text-sm text-gray-500">?? 2022 Isaiah Collins Abetong</p>
		<button class="button-primary" on:click={() => (show = !show)}>Close</button>
	</div>
</Modal>

<style lang="postcss">
	:global(body) {
		background-color: theme(colors.white);
		transition: background-color 0.3s;
	}
	:global(body.dark) {
		background-color: theme(colors.gray.800);
	}
</style>
