import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs'

export async function onReadContent<T>(file: string): Promise<T[]> {
	const content = await readTextFile(file, { dir: BaseDirectory.AppData })
	const parsed = JSON.parse(content)
	return parsed
}

export async function onWriteContent<T>(file: string, contents: T[]): Promise<void> {
	return await writeTextFile(
		{
			contents: JSON.stringify(contents),
			path: file
		},
		{ dir: BaseDirectory.AppData }
	)
}
