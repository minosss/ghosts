import type {UseToastOptions, ToastId} from '@chakra-ui/react';

declare global {
	interface Window {
		$toast?: (options?: UseToastOptions) => ToastId;
	}
}

export {};
