import {
	readTextFile,
	removeFile,
	writeTextFile,
	createDir,
	BaseDirectory,
} from '@tauri-apps/api/fs';
import {appDir, join} from '@tauri-apps/api/path';

export async function resolveDataDir(...paths: string[]) {
	return join(await appDir(), 'data', ...paths);
}

export async function ensureAppDir() {
	return createDir('data', {dir: BaseDirectory.App, recursive: true});
}

export async function readAppFile(path: string) {
	return readTextFile(path, {dir: BaseDirectory.App});
}

export async function writeAppFile(path: string, content: string) {
	return writeTextFile(path, content, {dir: BaseDirectory.App});
}

export async function deleteAppFile(path: string) {
	return removeFile(path, {dir: BaseDirectory.App});
}
