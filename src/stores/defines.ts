import { writable } from 'svelte/store'

export const defines = writable<Define>({
	fee: 3,
	discount: 0,
	products: [],
	descriptions: []
})
