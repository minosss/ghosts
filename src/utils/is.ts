import {isUndefined} from '@chakra-ui/utils';
import type {Host, LocalHost, RemoteHost} from '../store/types';

export function isReadonly(host?: Host) {
	return !isUndefined(host) && (isSystem(host) || isRemote(host));
}

export function isSystem(host?: Host) {
	return !isUndefined(host) && host.id === 'system';
}

export function isRemote(host?: Host): host is RemoteHost {
	return !isUndefined(host) && host.type === 'remote';
}

export function isLocal(host?: Host): host is LocalHost {
	return !isUndefined(host) && host.type === 'local' && host.id !== 'system';
}

export function isDeleteable(host?: Host): host is Host {
	return !isSystem(host);
}

export function isPushable(host?: Host) {
	return !isUndefined(host) && host.id !== 'system' && host.enable === true;
}

export function isMac() {
	return PLATFORM === 'darwin';
}

export function isWindows() {
	return PLATFORM === 'win32';
}

export function isLinux() {
	return PLATFORM === 'linux';
}
