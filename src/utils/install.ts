import {defaultConfig} from './config';
import {ensureAppDir, readAppFile, writeAppFile} from './fs';
import {uuid} from './helper';
import {writeHostFile} from './hosts';
import {readSystemHost} from './system-hosts';

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

	// appDir/data
	await ensureAppDir();
	// store app config
	await writeAppFile('config.json', JSON.stringify(defaultConfig, null, 2));

	// copy system hosts
	const id = uuid();
	const content = await readSystemHost();
	await writeHostFile(id, content);

	// array of hosts
	await writeAppFile(
		'hosts.json',
		JSON.stringify(
			[
				{
					id,
					kind: 'local',
					name: 'System Copy',
					enable: false,
				},
			],
			null,
			2
		)
	);
	await writeAppFile('install.lock', `${Date.now()}`);
}
