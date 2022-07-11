import {useMemo} from 'react';
import {useCallbackRef} from '@chakra-ui/react';
import {createFilterWrapper, debounceFilter} from './filters';
import type {FunctionArgs, DebounceFilterOptions} from './filters';

export function useDebounceFn<T extends FunctionArgs>(
	fn: T,
	ms = 200,
	options?: DebounceFilterOptions
): T {
	const fnRef = useCallbackRef(fn);

	return useMemo(() => {
		return createFilterWrapper(debounceFilter(ms, options), fnRef);
	}, [fnRef, ms, options]);
}
