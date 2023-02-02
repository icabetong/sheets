import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs'

/**
 * An asynchronous function that utilizes Tauri's
 * app api to effectively read files from the host
 * system
 *
 * @param file the file or filepath target
 * @returns the parsed JSON object
 */
export async function onReadContent<T>(file: string): Promise<T> {
	const content = await readTextFile(file, { dir: BaseDirectory.AppData })
	const parsed = JSON.parse(content)
	return parsed
}

/**
 * An asynchronous function that utilizes Tauri's
 * app api to effectively write files to the host
 * system
 *
 * @param file the file or filepath target
 * @param contents the content that should be written on the file
 * @returns
 */
export async function onWriteContent<T>(file: string, contents: T): Promise<void> {
	return await writeTextFile(
		{
			contents: JSON.stringify(contents),
			path: file
		},
		{ dir: BaseDirectory.AppData }
	)
}
