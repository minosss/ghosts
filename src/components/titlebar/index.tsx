import {Box} from '@chakra-ui/react';
import {isWindows} from '../../utils/is';
import MacButtons from './mac-buttons';
import WindowsButtons from './windows-buttons';

const Buttons = isWindows() ? WindowsButtons : MacButtons;

export default function TitleBar() {
	return (
		<Box data-tauri-drag-region p={3} textAlign={isWindows() ? 'right' : 'left'}>
			<Buttons></Buttons>
		</Box>
	);
}
