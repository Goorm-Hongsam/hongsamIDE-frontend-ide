import { useMutation } from '@tanstack/react-query';
import { TCode } from '../../types/Code';
import defaultAxios from '../../api/defaultAxios';

const codeGet = async (requestData: TCode) => {
  const result = await defaultAxios.post('grade/get/lee', { ...requestData });
  return result;
};

const useCodeGet = (requestData: TCode) => {
  const codeGetMutate = useMutation({
    mutationFn: () => codeGet(requestData),
  });

  return { codeGetMutate };
};

export default useCodeGet;
