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
import axios, { AxiosError } from 'axios';

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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError 타입이라면 특정 처리를 해줄 수 있음
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // HTTP 응답이 존재하는 경우 처리
          const status = axiosError.response.status;
          if (status === 502) {
            // 502 에러 처리
            setCode(javaDefaultValue(questionId));
            setResult(`주석을 보고 코드 작성 방법을 이해한 후에 문제를 풀어보세요 !`);
          } else if (status === 403) {
            // 403 에러 처리
            setResult('본인의 문제에만 접근할 수 있습니다.');
          } else if (status === 401) {
            // 401 에러 처리
            setResult(
              '죄송합니다. 현재 세션이 만료되었거나 인증에 실패했습니다. 다시 로그인하고 시도해주세요.',
            );
          } else {
            // 기타 HTTP 오류 처리
            setResult('예상치 못한 문제가 발생했습니다.');
          }
        } else {
          // 네트워크 오류 등에 대한 처리
          setResult('네트워크 오류가 발생했습니다.');
        }
      } else {
        // AxiosError 타입이 아닌 다른 오류에 대한 처리
        setResult('알 수 없는 오류가 발생했습니다.');
      }
      setIsResultLoading(false);
    }
  };

  return { submitCode, saveCode, fetchCode, result, testCode, resultObj };
};

export default useCodeSubmit;
