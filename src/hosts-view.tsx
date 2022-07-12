import {Box, Flex} from '@chakra-ui/react';
import {isUndefined} from '@chakra-ui/utils';
import {useCallback, useMemo} from 'react';
import Editor from './components/editor';
import HostList from './components/host-list';
import Navbar from './components/navbar';
import PasswordModal from './components/password-modal';
import {useDebounceFn} from './hooks/use-debounce-fn';
import useHost from './hooks/use-host';
import {useStore} from './store';
import type {HostActionType} from './store/types';
import {writeHostFile} from './utils/hosts';

export default function HostsView() {
	const hosts = useStore((s) => s.hosts);
	const dispatch = useStore((s) => s.dispatch);
	const activeHost = useStore((s) => s.activeHost);

	const runAction = useCallback(
		(type: HostActionType) => {
			return (id: string) => {
				return dispatch({type, payload: id});
			};
		},
		[dispatch]
	);

	const actions = useMemo(
		() => ({
			select: runAction('update:active'),
			toggle: runAction('toggle:host'),
		}),
		[runAction]
	);

	const {content, readonly} = useHost(activeHost);

	const onChange = useDebounceFn(async (content: string) => {
		if (isUndefined(activeHost)) return;

		// store file
		await writeHostFile(activeHost.id, content);

		if (activeHost.enable) {
			try {
				await dispatch({type: 'push:system-hosts', payload: null});
			} catch (error: any) {
				window.$toast?.({
					title: `${error.message}`,
					status: 'error',
				});
				// TODO: handle other errors
				dispatch({type: 'required:password', payload: null});
			}
		}
	}, 1000);

	return (
		<div className='hosts-view'>
			<Flex
				gridArea='navbar'
				boxShadow='sm'
				flexFlow='column'
				onContextMenu={(e) => e.preventDefault()}
			>
				{/* titlebar */}
				<Navbar></Navbar>
			</Flex>
			<Box gridArea='sidebar' overflow='hidden' onContextMenu={(e) => e.preventDefault()}>
				<HostList
					hosts={hosts}
					activeHost={activeHost}
					onSelect={actions.select}
					onToggle={actions.toggle}
				></HostList>
			</Box>
			<Box gridArea='content' overflow='hidden'>
				<Editor value={content} readonly={readonly} onChange={onChange}></Editor>
			</Box>
			<PasswordModal></PasswordModal>
		</div>
	);
}
