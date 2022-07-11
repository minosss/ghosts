import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useStore} from '../store';
import {isWindows} from '../utils/is';

// macOs / linux password required
export default function PasswordModal() {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const password = useStore((s) => s.password);
	const dispatch = useStore((s) => s.dispatch);
	const [psw, setPsw] = useState(password);

	useEffect(() => {
		if (password || isWindows()) return;

		const id = window.setTimeout(() => {
			setPsw('');
			onOpen();
		}, 1000);

		return () => {
			window.clearTimeout(id);
		};
	}, [onOpen, password]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay></ModalOverlay>
			<ModalContent>
				<ModalCloseButton></ModalCloseButton>
				<ModalHeader>Permission Required</ModalHeader>
				<ModalBody>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							type='password'
							placeholder='your password'
							value={psw}
							onChange={(e) => setPsw(e.target.value)}
						></Input>
						<FormHelperText>
							require password every time the app starts
						</FormHelperText>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme='telegram'
						onClick={() => {
							dispatch({
								type: 'set:password',
								//
								payload: (psw || '')
									.replace(/\s/g, '')
									.replace(/\\/g, '\\\\')
									.replace(/'/g, '\\x27'),
							});
							onClose();
						}}
					>
						Ok
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
