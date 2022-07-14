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
		case 'refresh:host': {
			const active = state.hosts.find((host) => host.id === state.activeHost?.id);
			return {
				...state,
				// copy the active host, reload
				activeHost: active && {...active},
			};
		}
		case 'create:host':
			return {...state, hosts: [...state.hosts, action.payload]};
		case 'update:host': {
			const nextHosts = [...state.hosts];
			const {id, ...patch} = action.payload;
			const index = nextHosts.findIndex((host) => host.id === id);
			if (index > 0) {
				const nextHost = {...state.hosts[index], ...patch};
				nextHosts.splice(index, 1, nextHost);

				return {
					...state,
					hosts: nextHosts,
					activeHost: state.activeHost?.id === id ? nextHost : state.activeHost,
				};
			}
			break;
		}
		case 'update:host:bulk': {
			const patchs = action.payload as Host[];
			const nextHosts = [...state.hosts].map((host) => {
				const h = patchs.find((ph) => ph.id === host.id);
				if (h) {
					return {...host, ...h};
				}
				return {...host};
			});

			return {
				...state,
				hosts: nextHosts,
				activeHost: nextHosts.find((h) => h.id === state.activeHost?.id),
			};
			break;
		}
		case 'delete:host': {
			const found = state.hosts.find((host) => host.id === action.payload.id);

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
