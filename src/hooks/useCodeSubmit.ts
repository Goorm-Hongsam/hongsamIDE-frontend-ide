import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  codeState,
  isResultLoadingState,
  languageState,
  questionIdState,
  resultObjState,
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
  const [resultObj, setResultObj] = useRecoilState(resultObjState);
  const setIsResultLoading = useSetRecoilState(isResultLoadingState);

  const submitCode = async () => {
    setResult('');
    setIsResultLoading(true);
    try {
      const result = await defaultAxios.post('grader/run', {
        uuid: uuid,
        questionId: questionId,
        requestCode: code,
        language: language,
        gradeType: 'all',
      });
      console.log(result);
      setResult('');
      setIsResultLoading(false);
      setResultObj(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const testCode = async () => {
    setResult('');
    setIsResultLoading(true);
    try {
      const result = await defaultAxios.post('grader/run', {
        questionId: questionId,
        uuid: uuid,
        requestCode: code,
        language: language,
        gradeType: 'example',
      });
      setResult('');
      setIsResultLoading(false);
      setResultObj(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const saveCode = async () => {
    setResult('');
    setIsResultLoading(true);
    setResultObj({
      compileError: false,
      correctResult: [],
      errorMessage: null,
      originAnswer: [],
      printResult: [],
      timeResult: [],
    });
    try {
      const result = await defaultAxios.post('grader/save', {
        uuid: uuid,
        questionId: questionId,
        requestCode: code,
        language: language,
      });
      setIsResultLoading(false);
      setResult(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCode = async (uuidParam: string, questionIdParam: string) => {
    setResult(`주석을 보고 코드 작성 방법을 이해한 후에 문제를 풀어보세요 !`);
    try {
      const result = await defaultAxios.post('grader/get', {
        uuid: uuidParam,
        questionId: questionIdParam,
        language: language,
      });

      if (result.status === 200) {
        const requestCode = result.data.requestCode;
        setCode(requestCode);
        setIsResultLoading(false);
      }
      if (result.status === 500) {
        setCode(javaDefaultValue(questionId));
        setIsResultLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // React.useEffect(()=>{},[result, resultObj])

  return { submitCode, saveCode, fetchCode, result, testCode, resultObj };
};

export default useCodeSubmit;
