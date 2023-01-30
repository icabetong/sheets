declare global {
	interface EntryCore {
		customer?: string
		product: string
		description?: string
		amount: number
	}
	interface Entry extends EntryCore {
		id: string
	}

	interface EntryFormError {
		customer?: string
		product?: string
		description?: string
		amount?: string
	}
}
export {}
