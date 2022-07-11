import {defaultConfig} from './config';
import {ensureAppDir, readAppFile, writeAppFile} from './fs';

export async function isInstalled() {
	try {
		await readAppFile('install.lock');
		return true;
	} catch {
		return false;
	}
}

export async function install() {
	if (await isInstalled()) return;

	await ensureAppDir();
	// store app config
	await writeAppFile('config.json', JSON.stringify(defaultConfig, null, 2));
	// array of hosts
	await writeAppFile('hosts.json', JSON.stringify([], null, 2));
	await writeAppFile('install.lock', `${Date.now()}`);
}
