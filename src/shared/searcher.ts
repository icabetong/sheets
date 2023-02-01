export function search<T extends {}>(source: T[], query: string): T[] {
	query = query.trim().toLowerCase()

	return source.filter((item) => {
		const values = Object.values(item)
		return (
			values.filter((value) => {
				console.log(value)
				if (typeof value === 'string') return value.toLowerCase().includes(query)
			}).length > 0
		)
	})
}
