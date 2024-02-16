import { useMutation } from '@tanstack/react-query';
import { TCode } from '../../types/Code';
import defaultAxios from '../../api/defaultAxios';

const codeSave = async (requestData: TCode) => {
  const result = await defaultAxios.post('grade/save/lee', { ...requestData });
  return result;
};

const useCodeSave = (requestData: TCode) => {
  const codeSaveMutate = useMutation({
    mutationFn: () => codeSave(requestData),
  });

  return { codeSaveMutate };
};

export default useCodeSave;
