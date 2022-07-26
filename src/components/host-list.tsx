import {Text, Box, List, ListItem, Switch, Flex, Tooltip} from '@chakra-ui/react';
import {useCallback, memo} from 'react';
import {FileIcon, RemoteIcon, SystemIcon} from '../components/icons';
import {isRemote, isSystem} from '../utils/is';
import type {ActiveProps, Host} from '../store/types';
import {Time} from './time';

interface HostListProps extends ActiveProps {
	hosts: Host[];
	onSelect?: (id: string) => void;
	onToggle?: (id: string) => void;
}

// eslint-disable-next-line react/display-name
const TooltipLabel = memo(({host}: {host: Host}) => {
	if (isRemote(host)) {
		return (
			<div>
				<div>{host.name}</div>
				<div>{host.url}</div>
				Updated at <Time time={host.updatedAt}></Time>
			</div>
		);
	}

	return <div>{host.name}</div>;
});

export default function HostList({hosts = [], activeHost, onSelect, onToggle}: HostListProps) {
	const selectHost = useCallback(
		(host: Host) => {
			return () => {
				onSelect?.(host.id);
			};
		},
		[onSelect]
	);

	const toggleHost = useCallback(
		(host: Host) => {
			return () => {
				onToggle?.(host.id);
			};
		},
		[onToggle]
	);

	const renderIcon = (host: Host) => {
		if (isSystem(host)) return <SystemIcon />;

		if (isRemote(host)) return <RemoteIcon />;

		return <FileIcon />;
	};

	return (
		<Box overflowY='auto' h='full'>
			<List my={3}>
				{hosts.map((host) => (
					<ListItem key={host.id} onClick={selectHost(host)}>
						<Tooltip placement='right' hasArrow label={<TooltipLabel host={host} />}>
							<Flex
								mx={3}
								px={3}
								py={1.5}
								userSelect='none'
								cursor='default'
								justifyContent='space-between'
								alignItems='center'
								bg={host.id === activeHost?.id ? 'gray.100' : 'transparent'}
								borderRadius={3}
							>
								<div>
									<Text fontSize='sm'>
										{renderIcon(host)} {host.name}
									</Text>
								</div>
								{!isSystem(host) && (
									<Switch
										isChecked={host.enable}
										onChange={toggleHost(host)}
									></Switch>
								)}
							</Flex>
						</Tooltip>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
