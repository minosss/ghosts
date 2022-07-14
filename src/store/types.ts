interface BaseHost {
	id: string;
	name: string;
	enable?: boolean;
}

export interface RemoteHost extends BaseHost {
	kind: 'remote';
	url: string;
	interval?: number;
	updatedAt?: number;
}

export interface LocalHost extends BaseHost {
	kind: 'local';
}

export type Host = RemoteHost | LocalHost;

export interface StoreState {
	// list
	hosts: Host[];
	// current selected hosts
	activeHost?: Host;
	password?: string;
}

export interface ActiveProps {
	activeHost?: Host;
}

// unused
export type AppActionType = 'set:password' | 'required:password';
export type HostActionType =
	| 'update:active'
	| 'refresh:host'
	| 'create:host'
	| 'update:host'
	| 'update:host:bulk'
	| 'toggle:host'
	| 'delete:host'
	| 'reset:host'
	| 'push:system-hosts';

export interface StoreAction<T = any> {
	type: AppActionType | HostActionType;
	payload: T;
}
