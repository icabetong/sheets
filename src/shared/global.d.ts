declare global {
	interface Entry {
		id: string
		customer?: string
		product: string
		description?: string
		amount: number
	}
}
export {}
