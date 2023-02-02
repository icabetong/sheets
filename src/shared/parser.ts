import { randomId } from './tools'

/**
 * A function that converts raw string of comma-delimited
 * values to JavaScript's object notation.
 *
 * @param source the raw source string of csv
 * @returns the parsed Entry array
 */
export function parseFromCSV<T>(source: string, callback: (line: string[]) => T): T[] {
	const content = source.split('\n')
	return content.filter((line) => line.trim().length > 0).map((line) => callback(line.split(',')))
}
