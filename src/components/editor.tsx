import {EditorView} from 'codemirror';
import {
	highlightActiveLine,
	highlightActiveLineGutter,
	lineNumbers,
	keymap,
	drawSelection,
} from '@codemirror/view';
import {EditorSelection, EditorState} from '@codemirror/state';
import {useEffect, useRef} from 'react';
import {Box, useCallbackRef} from '@chakra-ui/react';
import {defaultHighlightStyle, syntaxHighlighting} from '@codemirror/language';
import {defaultKeymap, historyKeymap, history, toggleComment} from '@codemirror/commands';
import {lang} from '../utils/lang-hosts';

interface EditorProps {
	value?: string;
	readonly?: boolean;
	onChange?: (value: string) => void;
}

// content editor
export default function Editor({onChange, value, readonly}: EditorProps) {
	const editor = useRef<EditorView>();
	const onChangeRef = useCallbackRef(onChange);

	useEffect(() => {
		const el = document.querySelector('#editor');
		if (!el) return;

		editor.current = new EditorView({
			parent: el,
			doc: value,
			extensions: [
				lineNumbers({
					domEventHandlers: {
						// click line number to toggle comment
						mousedown(view, line) {
							// select the line which clicked
							view.dispatch({
								selection: EditorSelection.single(line.from),
							});
							return toggleComment(view);
						},
					},
				}),
				history(),
				// custom selection
				drawSelection(),
				// current line
				highlightActiveLineGutter(),
				highlightActiveLine(),
				syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
				// readonly
				EditorState.readOnly.of(Boolean(readonly)),
				EditorState.changeFilter.of((tr) => {
					if (tr.docChanged) {
						onChangeRef(tr.newDoc.toString());
					}
					return true;
				}),
				// hosts highlight
				lang,
				keymap.of([
					//
					...defaultKeymap,
					...historyKeymap,
				]),
			],
		});

		return () => {
			editor.current?.destroy();
			editor.current = undefined;
		};
	}, [value, readonly, onChangeRef]);

	return <Box id='editor' overflowY='auto'></Box>;
}
