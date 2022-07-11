// SwitchHosts
// codemirror 5 style

import {StreamLanguage, StringStream} from '@codemirror/language';

function tokenBase(stream: StringStream) {
	if (stream.eatSpace()) return null;

	const sol = stream.sol();
	const ch = stream.next();

	const s = stream.string;

	if (ch === '#') {
		stream.skipToEnd();
		return 'comment';
	}

	if (!/^\s*([\d.]+|[\d%.:a-flo]+)\s+\w/i.test(s)) {
		return 'error';
	}

	if (sol && ch && /[\w%.:]/.test(ch)) {
		stream.eatWhile(/[\w%.:]/);
		return 'def';
	}

	return null;
}

export const lang = StreamLanguage.define({
	startState() {
		return {};
	},
	token(stream, state) {
		return tokenBase(stream);
	},
	languageData: {
		commentTokens: {line: '#'},
	},
});
