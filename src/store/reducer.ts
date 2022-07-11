import {isDeleteable} from '../utils/is';
import type {Host, StoreAction, StoreState} from './types';

export default function reducer(state: StoreState, action: StoreAction): StoreState {
	switch (action.type) {
		case 'update:active':
			return {
				...state,
				activeHost: state.hosts.find((host) => host.id === action.payload),
			};
		case 'set:password':
			return {
				...state,
				password: action.payload,
			};
			break;
		case 'required:password':
			return {
				...state,
				password: typeof state.password === 'undefined' ? '' : undefined,
			};
		case 'refresh:host':
			return {
				...state,
				// copy the active host, reload
				activeHost: state.activeHost && {...state.activeHost},
			};
		case 'create:host':
			return {...state, hosts: [...state.hosts, action.payload]};
		case 'delete:host': {
			const found = state.hosts.find((host) => host.id === action.payload);

			// can't remove system-hosts
			if (isDeleteable(found)) {
				// filter remove host
				const nextHosts = state.hosts.filter((host) => host.id !== found.id);
				// reselect the first one
				const activeHost =
					state.activeHost?.id === found.id ? nextHosts[0] : state.activeHost;

				return {
					...state,
					hosts: nextHosts,
					activeHost,
				};
			}
			break;
		}
		case 'toggle:host': {
			const nextHosts = [...state.hosts];
			const index = nextHosts.findIndex((h) => h.id === action.payload);
			if (index > 0) {
				const host = nextHosts[index];
				nextHosts.splice(index, 1, {...host, enable: !host.enable});
				return {
					...state,
					hosts: nextHosts,
				};
			}
			break;
		}
		case 'reset:host': {
			const hosts: Host[] = action.payload || [];
			return {
				...state,
				hosts: [...hosts],
				activeHost: hosts[0],
			};
		}
	}
	return state;
}
