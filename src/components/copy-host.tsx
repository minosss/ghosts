import {IconButton, Tooltip} from '@chakra-ui/react';
import {useCallback} from 'react';
import type {Host} from '../store/types';
import {copyToClipboard} from '../utils/helper';
import {readHost} from '../utils/hosts';
import {CopyIcon} from './icons';

interface CopyHostProps {
	host?: Host;
}

export default function CopyHost({host}: CopyHostProps) {
	const onCopy = useCallback(async () => {
		if (host) {
			const text = await readHost(host);
			await copyToClipboard(text);
			window.$toast?.({
				title: `${host.name} copied`,
				status: 'success',
				duration: 2000,
			});
		}
	}, [host]);

	return (
		<Tooltip label='copy to clipboard' hasArrow>
			<IconButton
				variant='ghost'
				aria-label='copy'
				icon={<CopyIcon />}
				onClick={onCopy}
			></IconButton>
		</Tooltip>
	);
}
