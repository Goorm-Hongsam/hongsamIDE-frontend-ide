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
      const result = await defaultAxios.post(`grader/run/${uuid}`, {
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
      const result = await defaultAxios.post(`grader/run/${uuid}`, {
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
      const result = await defaultAxios.post(`grader/save/${uuid}`, {
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
      const result = await defaultAxios.post(`grader/get/${uuidParam}`, {
        uuid: uuidParam,
        questionId: questionIdParam,
        language: language,
      });
      if (result.status === 200) {
        const requestCode = result.data.requestCode;
        setCode(requestCode);
        setIsResultLoading(false);
      }
      //최초 문제 진입
      if (result.status === 502) {
        setCode(javaDefaultValue(questionId));
        setResult(`주석을 보고 코드 작성 방법을 이해한 후에 문제를 풀어보세요 !`);
        setIsResultLoading(false);
      }
      /**
       * 토큰 헤더에 포함 안되었거나, uuid 비교했을 때 실패(다른 사람의 문제풀이 페이지에 접근한 경우) : 403
       * 토큰 유효성 검증 실패 : 401
       */
      if (result.status === 403) {
        setIsResultLoading(false);
        setResult('본인의 문제에만 접근할 수 있습니다.');
      }
      if (result.status === 401) {
        setIsResultLoading(false);
        setResult(
          '죄송합니다. 현재 세션이 만료되었거나 인증에 실패했습니다. 다시 로그인하고 시도해주세요.',
        );
      }
    } catch (error) {
      console.log(error);
      setIsResultLoading(false);
      setResult('예상치 못한 문제가 발생했습니다.');
    }
  };

  return { submitCode, saveCode, fetchCode, result, testCode, resultObj };
};

export default useCodeSubmit;
