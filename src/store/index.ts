import create from 'zustand';
import {createHost, deleteHostFile, updateRemoteHostFile, writeHosts} from '../utils/hosts';
import {isRemote} from '../utils/is';
import {pushSystemHost} from '../utils/system-hosts';
import reducer from './reducer';
import type {Host, StoreAction, StoreState} from './types';

export const useStore = create<
	StoreState & {
		dispatch: (action: StoreAction) => Promise<void>;
		deleteHost: (host: Host) => Promise<void>;
		createHost: (data: any) => Promise<void>;
		refreshHost: (host: Host) => Promise<void>;
	}
>((set, get) => ({
	hosts: [],
	dispatch: async (action: StoreAction) => {
		let updateHosts = false;
		let updateSystemHost = false;

		switch (action.type) {
			case 'create:host':
				updateHosts = true;
				break;
			case 'update:host':
			case 'delete:host': {
				updateHosts = true;
				const found = get().hosts.find((host) => host.id === action.payload.id);
				if (found) {
					updateSystemHost = Boolean(found.enable);
				}
				break;
			}
			case 'update:host:bulk':
			case 'toggle:host':
				updateHosts = true;
				updateSystemHost = true;
				break;
			case 'push:system-hosts':
				updateSystemHost = true;
				break;
		}

		// before
		set((state) => reducer(state, action));
		// after

		if (updateHosts) {
			await writeHosts(get().hosts);
		}

		if (updateSystemHost) {
			const {hosts, password} = get();
			await pushSystemHost(hosts, {password});
		}
	},
	async deleteHost(host: Host) {
		if (host.enable) {
			await deleteHostFile(host.id);
		}
		return get().dispatch({type: 'delete:host', payload: {id: host.id}});
	},
	async createHost(data: Record<string, any>) {
		const host = await createHost(data as any);
		return get().dispatch({type: 'create:host', payload: host});
	},
	async refreshHost(host: Host) {
		//
		if (isRemote(host)) {
			await updateRemoteHostFile(host.id, host.url);
		}
		return get().dispatch({type: 'refresh:host', payload: host.id});
	},
}));
