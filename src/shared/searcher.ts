/**
 *
 * @param source the source object array that will be searched
 * @param query the search query
 * @returns an array which has all matching constraints with the query
 */
export function search<T extends object>(source: T[], query: string): T[] {
	query = query.trim().toLowerCase()

	return source.filter((item) => {
		const values = Object.values(item)
		return (
			values.filter((value) => {
				if (typeof value === 'string') return value.toLowerCase().includes(query)
			}).length > 0
		)
	})
}
