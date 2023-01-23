import {IconButton, Tooltip, useBoolean} from '@chakra-ui/react';
import {useCallback} from 'react';
import {useStore} from '../store';
import type {Host} from '../store/types';
import {RefreshIcon} from './icons';

interface RefreshHostProps {
	host?: Host;
}

export default function RefreshHost({host}: RefreshHostProps) {
	const [loading, actions] = useBoolean();

	const refreshHost = useStore((s) => s.refreshHost);

	const onRefresh = useCallback(async () => {
		actions.on();
		try {
			if (host) {
				await refreshHost(host);
			}
		} catch (error: any) {
			window.$toast?.({
				title: `${error.message}`,
				status: 'error',
			});
		}

		actions.off();
	}, [actions, host, refreshHost]);

	return (
		<Tooltip label='Refresh' hasArrow placement='bottom-end'>
			<IconButton
				isLoading={loading}
				variant='ghost'
				aria-label='refresh'
				icon={<RefreshIcon />}
				onClick={onRefresh}
			></IconButton>
		</Tooltip>
	);
}
