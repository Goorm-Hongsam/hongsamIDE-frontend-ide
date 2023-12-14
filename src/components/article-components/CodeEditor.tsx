import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';

// import { javascript } from '@codemirror/lang-javascript';
// import { python } from '@codemirror/lang-python';

import { EditorView } from '@uiw/react-codemirror';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { java } from '@codemirror/lang-java';
import Terminal from './Terminal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { codeState, isDarkModeState } from '../../atoms/recoliAtoms';
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

  const editorRef = React.useRef<ReactCodeMirrorRef>(null);
  // React.useEffect(() => {
  //   const el = editorRef.current;
  //   const cmview = new EditorView({
  //     doc: code,
  //     extensions: [basicSetup, githubDark, javaLang, autocompletion()],
  //   });
  //   cmview.dom.style.height = '100%';
  //   // cmview.dom.style.overflowY = 'scroll';
  //   el.innerHTML = '';
  //   el?.appendChild(cmview.dom);
  //   console.log(el?.children);
  //   console.log(code);
  // }, [code]);
  // const onChange = React.useCallback((val, viewUpdate) => {
  //   console.log('val:', val);
  //   setCode(val);
  // }, []);
  // return <div className='relative' ref={editorRef} style={{ height: '80%', width: '100%' }}></div>;

  const onChange = React.useCallback((val: string) => {
    setCode(val);
  }, []);

  React.useEffect(() => {
    console.log(editorRef.current?.editor);
  }, []);
  return (
    <div className='flex flex-col transition-all' style={{ height: '80%' }}>
      <CodeMirror
        minHeight='calc(100vh - 500px)'
        maxHeight='calc(100vh - 200px)'
        height='calc(100vh - 200px)'
        ref={editorRef}
        value={code}
        onChange={onChange}
        extensions={javaLang}
        theme={isDarkMode ? githubDark : githubLight}
      />
      <Terminal />
    </div>
  );
};

export default CodeEditor;
