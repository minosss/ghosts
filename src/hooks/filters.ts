// vueuse/vueuse

type Fn = () => void;

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
	fn: FunctionArgs<Args, This>;
	args: Args;
	thisArg: This;
}

export type EventFilter<Args extends any[] = any[], This = any> = (
	invoke: Fn,
	options: FunctionWrapperOptions<Args, This>
) => void;

export function createFilterWrapper<T extends FunctionArgs>(filter: EventFilter, fn: T) {
	function wrapper(this: any, ...args: any[]) {
		filter(() => fn.apply(this, args), {fn, thisArg: this, args});
	}

	return wrapper as any as T;
}

export interface DebounceFilterOptions {
	maxWait?: number;
}

export function debounceFilter(ms: number, options: DebounceFilterOptions = {}) {
	let timer: ReturnType<typeof setTimeout> | undefined;
	let maxTimer: ReturnType<typeof setTimeout> | undefined | null;

	const filter: EventFilter = (invoke) => {
		const duration = ms;
		const maxDuration = options.maxWait;

		if (timer) clearTimeout(timer);

		if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
			if (maxTimer) {
				clearTimeout(maxTimer);
				maxTimer = null;
			}
			return invoke();
		}

		// Create the maxTimer. Clears the regular timer on invokation
		if (maxDuration && !maxTimer) {
			maxTimer = setTimeout(() => {
				if (timer) clearTimeout(timer);
				maxTimer = null;
				invoke();
			}, maxDuration);
		}

		// Create the regular timer. Clears the max timer on invokation
		timer = setTimeout(() => {
			if (maxTimer) clearTimeout(maxTimer);
			maxTimer = null;
			invoke();
		}, duration);
	};

	return filter;
}
