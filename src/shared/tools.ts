/**
 * A function that checks whether the
 * current instance of the application
 * is `development` or debuggable.
 *
 * @returns true if the application is dev mode
 * or false of production
 */
export function isDev(): boolean {
	return import.meta.env.DEV
}

/**
 * A function which get the file extension
 * and returns it
 *
 * @param file the filename or file path
 * @returns the file extension
 */
export function getExtension(file: string): string {
	return file.includes('.') ? file.substring(file.lastIndexOf('.') + 1, file.length) : file
}

/**
 * A function which get the actual filename
 * and removes the extension from the filename
 * path
 *
 * @param file the filename path
 * @returns the filename with the file extension removed
 */
export function getFilename(file: string): string {
	return file.includes('.') ? file.substring(0, file.lastIndexOf('.')) : file
}

/**
 * A function which generates a 20-character
 * unique id
 * @returns the generated unique id
 */
export function randomId(): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let id = ''
	for (let i = 0; i < 20; i++) {
		id += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return id
}
