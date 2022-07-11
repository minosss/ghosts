import {
	IconButton,
	Drawer,
	DrawerBody,
	useDisclosure,
	DrawerOverlay,
	DrawerHeader,
	DrawerFooter,
	DrawerCloseButton,
	DrawerContent,
} from '@chakra-ui/react';
import {ConfigIcon} from './icons';

export default function ConfigModal() {
	const {isOpen, onOpen, onClose} = useDisclosure();

	return (
		<>
			<IconButton
				onClick={onOpen}
				aria-label='open config dialog'
				icon={<ConfigIcon />}
			></IconButton>
			<Drawer isOpen={isOpen} onClose={onClose} placement='right'>
				<DrawerOverlay></DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton></DrawerCloseButton>
					<DrawerHeader>header</DrawerHeader>
					<DrawerBody>body</DrawerBody>
					<DrawerFooter>footer</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
