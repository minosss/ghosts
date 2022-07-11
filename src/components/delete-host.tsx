import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	IconButton,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import {useCallback, useRef} from 'react';
import {useStore} from '../store';
import type {Host} from '../store/types';
import {isDeleteable} from '../utils/is';
import {TrashIcon} from './icons';

interface DeleteHostProps {
	host?: Host;
}

export default function DeleteHost({host}: DeleteHostProps) {
	const cancelRef = useRef<HTMLButtonElement>(null);
	const deleteHost = useStore((s) => s.deleteHost);

	const {isOpen, onOpen, onClose} = useDisclosure({});

	const onDelete = useCallback(() => {
		if (isDeleteable(host)) {
			deleteHost(host);
		}

		onClose();
	}, [deleteHost, host, onClose]);

	return (
		<>
			{isDeleteable(host) && (
				<Tooltip label='delete' hasArrow>
					<IconButton
						variant='ghost'
						colorScheme='red'
						aria-label='delete current host'
						onClick={onOpen}
						icon={<TrashIcon />}
					></IconButton>
				</Tooltip>
			)}
			<AlertDialog
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				leastDestructiveRef={cancelRef}
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogCloseButton></AlertDialogCloseButton>
					<AlertDialogHeader>Are you sure?</AlertDialogHeader>
					<AlertDialogBody>
						Delete <b>{host?.name}</b>, confirm?
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							No
						</Button>
						<Button colorScheme='red' ml={3} onClick={onDelete}>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
