import 'vite/client'

declare global {
	interface EntryCore {
		customer?: string
		product: string
		description?: string
		amount: number
	}
	interface Entry extends EntryCore {
		id: string
		timestamp: number
	}
	interface Define {
		fee: number
		discount: number
		products: string[]
		descriptions: string[]
	}

	interface EntryFormError {
		customer?: string
		product?: string
		description?: string
		amount?: string
	}
}

declare namespace svelte.JSX {
	/* eslint-disable @typescript-eslint/no-unused-vars */
	interface HTMLProps<T> {
		onClickOutside?: (e: CustomEvent) => void
	}
	/* eslint-enable @typescript-eslint/no-unused-vars */
}
