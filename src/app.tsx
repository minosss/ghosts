import {
	ChakraProvider,
	extendTheme,
	withDefaultSize,
	Center,
	Spinner,
	useToast,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {isDefined} from '@chakra-ui/utils';
import {install} from './utils/install';
import HostsView from './hosts-view';
import {useStore} from './store';
import {readHosts} from './utils/hosts';

const theme = extendTheme(
	withDefaultSize({
		size: 'sm',
		components: ['Button', 'Input', 'Radio', 'Switch'],
	})
);

if (isDefined(window)) {
	install();
}

function App() {
	const [loading, setLoading] = useState(true);
	const toast = useToast({duration: 2000});
	const dispatch = useStore((s) => s.dispatch);

	// NOTE: use-effect will run twice in development mode
	useEffect(() => {
		let ignore = false;

		async function load() {
			const hosts = await readHosts();
			if (!ignore) {
				dispatch({type: 'reset:host', payload: hosts});
				setLoading(false);
			}
		}

		load();

		return () => {
			ignore = true;
		};
	}, [dispatch]);

	useEffect(() => {
		// use outside the component

		window.$toast = toast;

		return () => {
			window.$toast = undefined;
		};
	}, [toast]);

	return (
		<ChakraProvider theme={theme}>
			<div className='app'>
				{loading && (
					<Center h='full'>
						<Spinner></Spinner>
					</Center>
				)}
				{!loading && <HostsView />}
			</div>
		</ChakraProvider>
	);
}

export default App;
