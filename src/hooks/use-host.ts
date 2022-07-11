import {isUndefined} from '@chakra-ui/utils';
import {useEffect, useState, useTransition} from 'react';
import type {Host} from '../store/types';
import {readHost} from '../utils/hosts';
import {isReadonly} from '../utils/is';

export default function useHost(host?: Host) {
	const [, startTransition] = useTransition();
	const [content, setContent] = useState<string>();
	const [readonly, setReadonly] = useState(false);

	useEffect(() => {
		let ignore = false;

		async function load() {
			if (isUndefined(host)) return;

			try {
				const text = await readHost(host);

				if (ignore) return;

				startTransition(() => {
					setContent(text);
					setReadonly(isReadonly(host));
				});
			} catch (error: any) {
				window.$toast?.({title: error.toString(), status: 'error'});
			}
		}

		load();

		return () => {
			ignore = true;
		};
	}, [host]);

	return {content, readonly};
}
