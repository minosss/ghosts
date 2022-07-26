import {memo} from 'react';
import {formatDistanceStrict} from 'date-fns';

interface TimeProps {
	time?: number | Date;
	to?: number | Date;
}

const Time = memo(({time, to}: TimeProps) => {
	const now = Date.now();
	return <time>{formatDistanceStrict(time ?? now, to ?? now, {addSuffix: true})}</time>;
});

Time.displayName = 'Time';

export default Time;
