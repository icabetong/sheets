export function parseFromCSV(source: string): EntryCore[] {
	const content = source.split('\n')
	return content.map((line) => {
		const values = line.split(',')
		return {
			customer: values[0],
			product: values[1],
			description: values[2],
			amount: parseInt(values[3])
		}
	})
}
