import { useRecoilState, useRecoilValue } from 'recoil';
import {
  codeState,
  languageState,
  questionIdState,
  resultState,
  uuidState,
} from '../atoms/recoliAtoms';
import defaultAxios from '../api/defaultAxios';
import javaDefaultValue from '../utils/Editor/defaultCode';

const useCodeSubmit = () => {
  const [code, setCode] = useRecoilState(codeState);
  const uuid = useRecoilValue(uuidState);
  const questionId = useRecoilValue(questionIdState);
  const language = useRecoilValue(languageState);
  const [result, setResult] = useRecoilState(resultState);

  const submitCode = async () => {
    setResult('');
    try {
      const result = await defaultAxios.post('ide/run', {
        uuid: uuid,
        questionId: questionId,
        requestCode: code,
        language: language,
      });
      setResult(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const saveCode = async () => {
    setResult('');
    try {
      const result = await defaultAxios.post('ide/save', {
        uuid: uuid,
        questionId: questionId,
        requestCode: code,
        language: language,
      });
      setResult(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCode = async (uuidParam: string, questionIdParam: string) => {
    setResult(`주석을 보고 코드 작성 방법을 이해한 후에 문제를 풀어보세요 !`);
    try {
      const result = await defaultAxios.post('ide/latest', {
        uuid: uuidParam,
        questionId: questionIdParam,
      });
      if (result.status === 200) {
        const requestCode = result.data;
        setCode(requestCode);
      }
      if (result.status === 500) {
        setCode(javaDefaultValue(questionId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { submitCode, saveCode, fetchCode, result };
};

export default useCodeSubmit;
