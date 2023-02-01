import { randomId } from './tools'

export function parseFromCSV(source: string): Entry[] {
	const content = source.split('\n')
	return content
		.filter((line) => line.trim().length > 0)
		.map((line) => {
			const values = line.split(',')
			return {
				customer: values[0],
				product: values[1],
				description: values[2],
				amount: parseInt(values[3]),
				timestamp: Date.parse(values[4]),
				id: randomId()
			}
		})
}
