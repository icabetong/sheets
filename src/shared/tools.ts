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
