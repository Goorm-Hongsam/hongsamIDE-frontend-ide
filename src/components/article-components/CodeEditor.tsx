import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript, jsxLanguage } from '@codemirror/lang-javascript';
import { useCodeMirror, EditorView } from '@uiw/react-codemirror';
import { autocompletion } from '@codemirror/autocomplete';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import Terminal from './Terminal';
import { basicSetup } from 'codemirror';
import javaDefaultValue from '../../utils/Editor/defaultCode';

const CodeEditor = () => {
  const javaLang = [java()];
  const jsLang = [javascript({ jsx: true })];
  const pyLang = [python()];
  const [code, setCode] = React.useState(javaDefaultValue);

  // const editorRef = React.useRef<HTMLDivElement>(null);

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
  return (
    <>
      <CodeMirror />
    </>
  );
};

export default CodeEditor;
