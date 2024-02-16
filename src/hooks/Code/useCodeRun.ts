import { useMutation } from '@tanstack/react-query';
import defaultAxios from '../../api/defaultAxios';
import { TCode } from '../../types/Code';
import { useRecoilValue } from 'recoil';
import { codeState, languageState, questionIdState, uuidState } from '../../atoms/recoliAtoms';

const codeRun = async (requestData: TCode) => {
  const result = await defaultAxios.post('grade/run/lee', { ...requestData });
  // const result = await defaultAxios.post('grade/run/park', { ...requestData });
  return result;
};

const useCodeRun = () => {
  const uuid = useRecoilValue(uuidState);
  const code = useRecoilValue(codeState);
  const questionId = useRecoilValue(questionIdState);
  const language = useRecoilValue(languageState);

  const requestData: TCode = {
    uuid: uuid,
    questionId: questionId,
    requestCode: code,
    language: language,
    gradeType: 'all',
  };
  const codeRunMutate = useMutation({
    mutationFn: () => codeRun(requestData),
    onSuccess: () => {
      return '성공';
    },
    onError: () => {
      return '에러';
    },
    onSettled: () => {
      return '실팽';
    },
  });

  return { codeRunMutate };
};

export default useCodeRun;
