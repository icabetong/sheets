<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'

	const dispatcher = createEventDispatcher()
	const dismiss = () => dispatcher('dismiss')

	export let show: boolean
	export let width: 'sm' | 'md' | 'lg' = 'md'

	const onOutsideClick = (e: MouseEvent) => {
		if (e.target) {
			let element = e.target as HTMLElement
			if ('close' in element.dataset) dismiss()
		}
	}
</script>

{#if show}
	<div>
		<div
			class="overlay fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center"
			data-close
			on:click={onOutsideClick}
			on:keydown={null}
			transition:fade={{ duration: 150 }}>
			<div
				class="relative m-auto rounded bg-white p-4 drop-shadow dark:bg-gray-700 dark:text-gray-50"
				class:w-sm={width === 'sm'}
				class:w-md={width === 'md'}
				class:w-lg={width === 'lg'}>
				<main><slot /></main>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
