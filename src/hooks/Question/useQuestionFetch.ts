import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchQuestion = async (questionId: string) => {
  const result = await axios.get(
    `https://hongsam-ide.s3.ap-northeast-2.amazonaws.com/admin/${questionId}/Question.md`,
  );
  return result;
};

const useQuestionFetch = (questionId: string) => {
  const questionQuery = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => fetchQuestion(questionId),
  });

  return { questionQuery };
};

export default useQuestionFetch;
