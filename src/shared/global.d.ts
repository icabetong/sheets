import 'vite/client'

declare global {
	interface EntryCore {
		customer: string
		product: string
		description: string
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
	interface DepositCore {
		amount: number
		bank: string
	}
	interface Deposit extends DepositCore {
		id: string
		timestamp: number
	}

	interface DepositFormError {
		bank?: string
		amount?: string
	}
	interface EntryFormError {
		customer?: string
		product?: string
		description?: string
		amount?: string
	}

	interface TableEvents<T> {
		select: T
		remove: T
	}

	/* eslint-disable @typescript-eslint/no-unused-vars */
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:clickOutside'?: (e: CustomEvent) => void
		}
	}
	/* eslint-enable @typescript-eslint/no-unused-vars */
}
