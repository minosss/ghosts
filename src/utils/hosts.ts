import {clampValue} from '@chakra-ui/utils';
import {join} from '@tauri-apps/api/path';
import {getClient, ResponseType} from '@tauri-apps/api/http';
import type {Host, LocalHost, RemoteHost} from '../store/types';
import {deleteAppFile, readAppFile, writeAppFile} from './fs';
import {uuid} from './helper';
import {isSystem} from './is';
import {readSystemHost, systemHost} from './system-hosts';

const HOSTS_FILE = 'hosts.json';

export async function readHosts(): Promise<Host[]> {
	const raw = await readAppFile(HOSTS_FILE);
	try {
		const hosts = JSON.parse(raw);
		return [{...systemHost}, ...hosts];
	} catch {
		return [{...systemHost}];
	}
}

export async function writeHosts(hosts: Host[]): Promise<void> {
	const data = hosts.filter((host) => !isSystem(host));
	await writeAppFile(HOSTS_FILE, JSON.stringify(data, null, 2));
}

const DEFAULT_CONTENT = '# Created by gHosts';

export function clampInterval(interval: any = '10') {
	return clampValue(Number.parseInt(interval), 10, 60);
}

export async function createHost(data: {
	name: string;
	type: 'local' | 'remote';
	url?: string;
	interval?: number | string;
}): Promise<Host> {
	const {type = 'local', name, url, interval} = data;

	const id = uuid();

	let host;

	//
	if (type === 'remote') {
		if (!url) throw new Error(`remote host url is required`);

		host = {
			id,
			name,
			type: 'remote',
			url,
			interval: clampInterval(interval),
			enable: false,
		} as RemoteHost;
	} else {
		host = {
			id,
			name,
			type,
			enable: false,
		} as LocalHost;
	}

	await writeHostFile(id, DEFAULT_CONTENT);

	return host;
}

export async function readHost(host: Host) {
	if (isSystem(host)) {
		return await readSystemHost();
	}
	return await readHostFile(host.id);
}

export async function readHostFile(id: string) {
	const file = await join('data', id);
	return readAppFile(file);
}

export async function writeHostFile(id: string, content: string) {
	const file = await join('data', id);
	return writeAppFile(file, content);
}

export async function deleteHostFile(id: string) {
	const file = await join('data', id);
	return deleteAppFile(file);
}

export async function readRemoteHostFile(url: string) {
	const client = await getClient();
	const response = await client.get<string>(url, {
		timeout: 10,
		headers: {},
		responseType: ResponseType.Text,
	});

	if (response.ok) {
		return response.data;
	}

	throw new Error(`load failed from ${url} with status ${response.status}`);
}

export async function updateRemoteHostFile(id: string, url: string) {
	const text = await readRemoteHostFile(url);
	await writeHostFile(id, text);
}
