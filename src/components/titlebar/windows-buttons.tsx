import {Flex, IconButton} from '@chakra-ui/react';
import {CloseIcon, MinusIcon} from '../icons';

export default function WindowsButtons() {
	return (
		<Flex>
			<IconButton
				variant='ghost'
				size='md'
				aria-label='min'
				rounded='none'
				icon={<MinusIcon />}
			></IconButton>
			<IconButton
				variant='ghost'
				size='md'
				aria-label='close'
				rounded='none'
				colorScheme='red'
				icon={<CloseIcon />}
			></IconButton>
		</Flex>
	);
}
