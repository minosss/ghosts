import {
	readTextFile,
	removeFile,
	writeTextFile,
	createDir,
	BaseDirectory,
} from '@tauri-apps/api/fs';
import {appDataDir, join} from '@tauri-apps/api/path';

export async function resolveDataDir(...paths: string[]) {
	return join(await appDataDir(), 'data', ...paths);
}

export async function ensureAppDir() {
	return createDir('data', {dir: BaseDirectory.AppData, recursive: true});
}

export async function readAppFile(path: string) {
	return readTextFile(path, {dir: BaseDirectory.AppData});
}

export async function writeAppFile(path: string, content: string) {
	return writeTextFile(path, content, {dir: BaseDirectory.AppData});
}

export async function deleteAppFile(path: string) {
	return removeFile(path, {dir: BaseDirectory.AppData});
}
