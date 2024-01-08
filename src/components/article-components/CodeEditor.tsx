import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';

import { EditorView } from '@uiw/react-codemirror';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { java } from '@codemirror/lang-java';

import { useRecoilState, useRecoilValue } from 'recoil';
import { codeState, isDarkModeState } from '../../atoms/recoliAtoms';

export interface ReactCodeMirrorRef {
  editor?: HTMLDivElement | null;
  state?: EditorState;
  view?: EditorView;
}

const CodeEditor: React.FC = () => {
  // const pyLang = [python()];
  // const jsLang = [javascript()];
  const javaLang = [java()];

  const [code, setCode] = useRecoilState(codeState);
  const isDarkMode = useRecoilValue(isDarkModeState);

  const onChange = React.useCallback((val: string) => {
    setCode(val);
  }, []);

  return (
    <CodeMirror
      height='100%'
      value={code}
      onChange={onChange}
      extensions={[javaLang]}
      theme={isDarkMode ? githubDark : githubLight}
    />
  );
};

export default CodeEditor;
