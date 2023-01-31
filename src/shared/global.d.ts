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
	interface DefineCore {
		name: string
		price: number
		discountedPrice?: number
	}
	interface Define extends DefineCore {
		id: string
	}

	interface EntryFormError {
		customer?: string
		product?: string
		description?: string
		amount?: string
	}
	interface DefineFormError {
		name?: string
		price?: string
		discountedPrice?: string
	}
}
export {}
