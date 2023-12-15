import React, { useEffect } from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';

// import { javascript } from '@codemirror/lang-javascript';
// import { python } from '@codemirror/lang-python';

import { EditorView } from '@uiw/react-codemirror';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { java } from '@codemirror/lang-java';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { codeState, isDarkModeState, languageState } from '../../atoms/recoliAtoms';

export interface ReactCodeMirrorRef {
  editor?: HTMLDivElement | null;
  state?: EditorState;
  view?: EditorView;
}

const CodeEditor = () => {
  // const pyLang = [python()];
  // const jsLang = [javascript({ jsx: true })];
  const javaLang = [java()];
  const [code, setCode] = useRecoilState(codeState);
  const isDarkMode = useRecoilValue(isDarkModeState);
  const setLanguage = useSetRecoilState(languageState);

  useEffect(() => {
    setLanguage('java');
  }, []);

  const editorRef = React.useRef<ReactCodeMirrorRef>(null);
  const onChange = React.useCallback((val: string) => {
    setCode(val);
  }, []);

  React.useEffect(() => {
    console.log(editorRef.current?.editor?.children[0]);
  }, []);

  return (
    <CodeMirror
      // minHeight='calc(100vh - 500px)'
      // maxHeight='calc(100vh - 200px)'
      // width='100%'
      height='100%'
      ref={editorRef}
      value={code}
      onChange={onChange}
      extensions={javaLang}
      theme={isDarkMode ? githubDark : githubLight}
    />
  );
};

export default CodeEditor;
