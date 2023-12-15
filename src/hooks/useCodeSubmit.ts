import { useRecoilState, useRecoilValue } from 'recoil';
import { codeState, languageState, questionIdState, uuidState } from '../atoms/recoliAtoms';
import axiosConfig from '../api/axiosConfig';
import javaDefaultValue from '../utils/Editor/defaultCode';

const useCodeSubmit = () => {
  const [code, setCode] = useRecoilState(codeState);
  const uuid = useRecoilValue(uuidState);
  const questionId = useRecoilValue(questionIdState);
  const language = useRecoilValue(languageState);

  const submitCode = async () => {
    try {
      const result = await axiosConfig.post('ide/run', {
        uuid: uuid,
        questionId: questionId,
        requestCode: code,
        language: language,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const saveCode = async () => {
    try {
      const result = await axiosConfig.post('ide/save', {
        uuid: uuid,
        questionId: questionId,
        requestCode: code,
        language: language,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCode = async (uuidParam: string, questionIdParam: string) => {
    try {
      const result = await axiosConfig.post('ide/latest', {
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

  return { submitCode, saveCode, fetchCode };
};

export default useCodeSubmit;
