import { Editor, useMonaco, MonacoEditorProps } from '@monaco-editor/react';
import defaultCode from '../../utils/Editor/defaultCode';
import React from 'react';
import TomorrowTheme from 'monaco-themes/themes/Tomorrow.json';
import TomorrowDarkTheme from 'monaco-themes/themes/Tomorrow-Night.json';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as monaco from '@monaco-editor/react';

const CodeEditor = () => {
  const monaco = useMonaco();
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = React.useState('');
  const [result, setResult] = React.useState('');
  const { uuidParam, questionIdParam } = useParams();
  const [resultModalView, setResultModalView] = React.useState(false);

  const compileCode = async () => {
    const code = editorRef.current.getValue();
    setResult('코드 컴파일 진행중 ...');
    await axios
      .post('https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/compile', {
        uuid: uuidParam,
        questionId: questionIdParam,
        requestCode: code,
        language: 'java',
      })
      .then((res) => {
        setResult(res.data);
        if (res.data === '정답입니다.' || res.data === '틀렸습니다.') {
          setResultModalView(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const saveCode = async () => {
    const code = editorRef.current.getValue();
    setResult('코드 저장 중...');
    await axios
      .post('https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/savecode', {
        uuid: uuidParam,
        questionId: questionIdParam,
        requestCode: code,
        language: 'java',
      })
      .then((res) => {
        console.log(res.data);
        setResult('코드 저장 완료');
      })
      .catch((err) => {
        console.log(err);
        setResult('코드 저장 실패 \n Run을 눌러도 코드 저장을 할수 있습니다.');
      });
  };

  const fetchCode = async () => {
    setResult('코드 불러오기중...');
    await axios
      .post('https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/getcode', {
        questionId: questionIdParam,
        uuid: uuidParam,
      })
      .then((res) => {
        setCode(res.data);
        setResult('코드 불러오기 완료');
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setCode(javaDefaultValue(questionIdParam));
          setResult(
            '주석을 보고 코드 작성 방법을 이해한 후에 아래의 타이머를 시작하여 문제를 풀어보세요 ! \n 아래의 타이머를 이용해서 내가 문제를 푼 동안 걸린 시간을 측정해보세요 !',
          );
        }
      });
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  React.useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme('tomorrow', TomorrowTheme);
    monaco.editor.defineTheme('tomorrowDark', TomorrowDarkTheme);

    monaco.editor.setTheme('tomorrowDark');
  }, [monaco]);

  return (
    <div className='w-10/12'>
      <Editor width='100%' height='100%' defaultLanguage='javascript' defaultValue={code} />
    </div>
  );
};

export default CodeEditor;
