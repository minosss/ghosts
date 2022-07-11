import {readAppFile, writeAppFile} from './fs';

const CONFIG_FILE = 'config.json';

export interface AppConfig {
	autoUpdates: boolean;
}

export const defaultConfig: AppConfig = {
	autoUpdates: true,
};

export async function readAppConfig() {
	const config = await readAppFile(CONFIG_FILE);
	return JSON.parse(config);
}

export async function writeAppConfig(config: AppConfig) {
	return writeAppFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}
