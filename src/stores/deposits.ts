import { writable } from 'svelte/store'

export const deposits = writable<Deposit[]>([])
