import {Command} from '@tauri-apps/api/shell';
import {readTextFile} from '@tauri-apps/api/fs';
import type {Host, LocalHost} from '../store/types';
import {getSystemHostsPath} from './helper';
import {isPushable, isWindows} from './is';
import {resolveDataDir} from './fs';

export const systemHost: Readonly<LocalHost> = {
	id: 'system',
	name: 'System',
	kind: 'local',
};

export async function readSystemHost(): Promise<string> {
	const path = getSystemHostsPath();
	if (!path) {
		throw new Error(`can't read system-hosts'`);
	}

	return readTextFile(path);
}

interface PushOptions {
	password?: string;
}

export async function pushSystemHost(hosts: Host[], options: PushOptions = {}): Promise<void> {
	const ids = hosts.filter((host) => isPushable(host)).map((host) => host.id);
	const dataDir = await resolveDataDir();
	const systemHosts = getSystemHostsPath();

	// cat, alias type in windows
	const cat = isWindows() ? 'type' : 'cat';

	// {appDir}/data/{id}
	const files = ids.join(' ');
	const cmds = [
		// cat multiple files to system hosts
		// ! I haven't tested performance, it should be fine, I think
		`${cat} ${files} > ${systemHosts}`,
	];

	// ensure system hosts is writeable
	if (isWindows()) {
		// TODO change file's permission
		// icacls? need admin
	} else {
		const {password} = options;
		if (!password) {
			throw new Error(`password is required`);
		}
		const sudo = password;
		// grant permission
		cmds.unshift(`echo '${sudo}' | sudo -S chmod 777 ${systemHosts}`);
		// readonly
		cmds.push(`echo '${sudo}' | sudo -S chmod 644 ${systemHosts}`);
	}

	// command
	const cmd = isWindows()
		? new Command('cmd', ['/C', cmds.join(' && ')], {cwd: dataDir})
		: new Command('sh', ['-c', cmds.join(' && ')], {cwd: dataDir});

	const output = await cmd.execute();

	if (output.code !== 0) {
		throw new Error(`${output.stderr}`);
	}
}
