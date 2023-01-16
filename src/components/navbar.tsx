import {Text, Flex, Center, HStack, Tag, Box} from '@chakra-ui/react';
import {useStore} from '../store';
import {isMac, isReadonly} from '../utils/is';
import CopyHost from './copy-host';
import DeleteHost from './delete-host';
import HostModal from './host-modal';
import RefreshHost from './refresh-host';

// TODO add custom titlebar
export default function Navbar() {
	const activeHost = useStore((s) => s.activeHost);

	return (
		<Flex pos='relative' h={10}>
			<Box pos='absolute' left={0} top={0} w='full' h='full' data-tauri-drag-region />
			<Center
				px={3}
				justifyContent='space-between'
				style={{
					width: 'var(--sidebar-width)',
				}}
			>
				<Text
					fontSize='xs'
					color='gray.600'
					fontWeight='bold'
					verticalAlign='middle'
					userSelect='none'
					pointerEvents='none'
					ml={isMac() ? 16 : 0}
				>
					gHosts
				</Text>
				<HStack>
					<HostModal></HostModal>
				</HStack>
			</Center>
			<Center flex={1} px={3} justifyContent='space-between'>
				<HStack>
					<Text
						fontWeight='bold'
						verticalAlign='middle'
						userSelect='none'
						pointerEvents='none'
					>
						{activeHost?.name || 'Hosts'}
					</Text>
					{isReadonly(activeHost) && <Tag size='sm'>readonly</Tag>}
					{/* edit */}
				</HStack>
				<HStack>
					<RefreshHost host={activeHost}></RefreshHost>
					<CopyHost host={activeHost}></CopyHost>
					<DeleteHost host={activeHost}></DeleteHost>
				</HStack>
			</Center>
		</Flex>
	);
}
