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
	interface HTMLProps<T> {
		onclickOutside?: (e: CustomEvent) => void
	}
}
export {}
