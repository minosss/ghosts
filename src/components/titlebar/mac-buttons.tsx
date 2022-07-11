import {appWindow} from '@tauri-apps/api/window';
import {Box, HStack} from '@chakra-ui/react';

export function ButtonBox({type, onClick}: {type: string; onClick: () => void}) {
	return (
		<Box
			onClick={onClick}
			boxSize={3}
			border='1px'
			borderColor={`${type}.500`}
			rounded='full'
			bg={`${type}.400`}
		></Box>
	);
}

export default function MacButtons() {
	return (
		<HStack>
			<ButtonBox
				type='red'
				onClick={() => {
					// appWindow.close();
					appWindow.hide();
				}}
			></ButtonBox>
			<ButtonBox
				type='yellow'
				onClick={() => {
					appWindow.minimize();
				}}
			></ButtonBox>
			<ButtonBox
				type='green'
				onClick={() => {
					appWindow.setFullscreen(true);
				}}
			></ButtonBox>
		</HStack>
	);
}
