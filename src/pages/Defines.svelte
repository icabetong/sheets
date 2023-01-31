<script lang="ts">
	import { confirm } from '@tauri-apps/api/dialog'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { ChevronLeft, Plus } from '@steeze-ui/heroicons'
	import { pop } from 'svelte-spa-router'
	import Page from '$lib/page/Page.svelte'
	import DefineEditor from '$components/define-editor/DefineEditor.svelte'
	import DefineTable from '$components/define-table/DefineTable.svelte'
	import { defines } from '$stores/defines'

	let show: boolean = false
	let define: Define | null = null

	const onTableSelect = (event: CustomEvent<Define>) => {
		define = event.detail
		show = true
	}
	const onTableRemove = async ({ detail }: CustomEvent<Define>) => {
		const confirmed = await confirm('Are you sure you want to delete this define?')

		if (confirmed) {
			$defines = $defines.filter((d) => d.id !== detail.id)
		}
	}
	const onEditorCreate = () => {
		define = null
		show = !show
	}
	const onEditorSubmit = ({ detail }: CustomEvent<Define>) => {
		let newDefines = Array.from($defines)
		const index = newDefines.findIndex((d) => d.id === detail.id)

		if (index >= 0) newDefines[index] = detail
		else newDefines.push(detail)

		$defines = newDefines
	}
</script>

<Page>
	<div class="sticky top-0 flex items-center bg-white py-8 dark:bg-gray-800">
		<button on:click={pop}>
			<Icon src={ChevronLeft} class="mr-4 h-6 w-6" />
		</button>
		<h1 class="header flex-1">Defines</h1>
		<button class="button-primary flex items-center px-4" on:click={onEditorCreate}>
			<Icon src={Plus} class="mr-2 h-6 w-6" />
			<span>Create</span>
		</button>
	</div>
	<div class="relative mt-4 overflow-x-auto">
		<DefineTable defines={$defines} on:select={onTableSelect} on:remove={onTableRemove} />
	</div>
</Page>
{#if show}
	<DefineEditor {define} {show} on:dismiss={() => (show = !show)} on:submit={onEditorSubmit} />
{/if}
