import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	RadioGroup,
	HStack,
	Radio,
	Input,
	ModalFooter,
	Button,
	useBoolean,
	IconButton,
	VStack,
	Tooltip,
} from '@chakra-ui/react';
import {useCallback, useState} from 'react';
import {useStore} from '../store';
import {AddIcon} from './icons';

interface FormHost {
	name: string;
	type: 'local' | 'remote';
	url: string;
	interval: number;
}

const defaultForm: FormHost = {
	name: '',
	type: 'local',
	url: '',
	interval: 10,
};

export default function HostModal() {
	const createHost = useStore((s) => s.createHost);
	const [form, setForm] = useState<FormHost>(defaultForm);
	const {isOpen, onOpen, onClose} = useDisclosure({
		onClose() {
			setForm({...defaultForm});
		},
	});
	const [loading, actions] = useBoolean(false);

	const updateField = useCallback((field: string) => {
		return (val: string) => {
			setForm((state) => ({...state, [field]: val}));
		};
	}, []);

	const onSave = useCallback(async () => {
		actions.on();

		try {
			await createHost({
				name: form.name,
				type: form.type,
				url: form.url,
				interval: form.interval,
			});
			onClose();
		} catch (error) {
			console.error(error);
		} finally {
			actions.off();
		}
	}, [actions, form, onClose, createHost]);

	return (
		<>
			<Tooltip label='create' hasArrow>
				<IconButton
					variant='ghost'
					onClick={onOpen}
					aria-label='create host'
					icon={<AddIcon />}
				></IconButton>
			</Tooltip>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Hosts</ModalHeader>
					<ModalCloseButton></ModalCloseButton>
					<ModalBody>
						<VStack>
							<FormControl>
								<FormLabel>Type</FormLabel>
								<RadioGroup defaultValue='local' onChange={updateField('type')}>
									<HStack spacing={6}>
										<Radio value='local'>Local</Radio>
										<Radio value='remote'>Remote</Radio>
									</HStack>
								</RadioGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Name</FormLabel>
								<Input
									onChange={(e) => updateField('name')(e.target.value)}
								></Input>
							</FormControl>
							{form.type === 'remote' && (
								<>
									<FormControl isRequired>
										<FormLabel>Url</FormLabel>
										<Input
											onChange={(e) => updateField('url')(e.target.value)}
										></Input>
									</FormControl>
									<FormControl isRequired>
										<FormLabel>Interval time (minute)</FormLabel>
										<RadioGroup
											defaultValue='10'
											onChange={updateField('interval')}
										>
											<HStack spacing={6}>
												<Radio value='10'>10</Radio>
												<Radio value='30'>30</Radio>
												<Radio value='60'>60</Radio>
											</HStack>
										</RadioGroup>
									</FormControl>
								</>
							)}
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onSave} isLoading={loading}>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
