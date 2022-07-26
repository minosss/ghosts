import {useCallbackRef} from '@chakra-ui/react';
import {EventCallback, listen, UnlistenFn} from '@tauri-apps/api/event';
import {useEffect} from 'react';

export function useTauriEvent<T = any>(event: string, fn: EventCallback<T>) {
	const handle = useCallbackRef(fn);

	useEffect(() => {
		let ignore = false;
		let unlisten: UnlistenFn;

		async function load() {
			unlisten = await listen<T>(event, handle);

			if (ignore) {
				unlisten?.();
			}
		}

		load();

		return () => {
			ignore = true;
			unlisten?.();
		};
	}, [event, handle]);
}
