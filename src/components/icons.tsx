import {Icon} from '@chakra-ui/react';
import type {PropsWithChildren} from 'react';

export function FeatherIcon({children}: PropsWithChildren) {
	return (
		<Icon
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			{children}
		</Icon>
	);
}

export function AddIcon() {
	return (
		<FeatherIcon>
			<line x1='12' y1='5' x2='12' y2='19'></line>
			<line x1='5' y1='12' x2='19' y2='12'></line>
		</FeatherIcon>
	);
}

export function MinusIcon() {
	return (
		<FeatherIcon>
			<line x1='5' y1='12' x2='19' y2='12'></line>
		</FeatherIcon>
	);
}

export function CloseIcon() {
	return (
		<FeatherIcon>
			<line x1='18' y1='6' x2='6' y2='18'></line>
			<line x1='6' y1='6' x2='18' y2='18'></line>
		</FeatherIcon>
	);
}

export function ConfigIcon() {
	return (
		<FeatherIcon>
			<circle cx='12' cy='12' r='3'></circle>
			<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
		</FeatherIcon>
	);
}

export function TrashIcon() {
	return (
		<FeatherIcon>
			<polyline points='3 6 5 6 21 6'></polyline>
			<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
			<line x1='10' y1='11' x2='10' y2='17'></line>
			<line x1='14' y1='11' x2='14' y2='17'></line>
		</FeatherIcon>
	);
}

export function EditIcon() {
	return (
		<FeatherIcon>
			<path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
			<path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
		</FeatherIcon>
	);
}

export function RefreshIcon() {
	return (
		<FeatherIcon>
			<polyline points='23 4 23 10 17 10'></polyline>
			<polyline points='1 20 1 14 7 14'></polyline>
			<path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'></path>
		</FeatherIcon>
	);
}

export function CopyIcon() {
	return (
		<FeatherIcon>
			<path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
			<rect x='8' y='2' width='8' height='4' rx='1' ry='1'></rect>
		</FeatherIcon>
	);
}

export function RemoteIcon() {
	return (
		<FeatherIcon>
			<circle cx='12' cy='12' r='10'></circle>
			<line x1='2' y1='12' x2='22' y2='12'></line>
			<path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'></path>
		</FeatherIcon>
	);
}
