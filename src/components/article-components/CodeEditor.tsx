import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';

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
// const langExtens = () => {
//   const javaLang = [java()];
//   const langMap = new Map();
//   langMap.set('java', javaLang);
//   return langMap;
// };

const CodeEditor: React.FC = () => {
  const javaLang = [java()];
  // const [lang, setLang] = React.useState('');
  // React.useEffect(() => {
  //   const lang = langExtens();

  //   console.log(lang.get('java'));
  // }, []);

  const setLanguage = useSetRecoilState(languageState);

  const [code, setCode] = useRecoilState(codeState);
  const isDarkMode = useRecoilValue(isDarkModeState);
  React.useEffect(() => {
    setLanguage('java');
  }, []);
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
