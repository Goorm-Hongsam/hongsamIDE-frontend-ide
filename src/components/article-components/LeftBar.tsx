import { useRecoilValue } from 'recoil';
import { cn } from '../../utils/cn';
import { isDarkModeState } from '../../atoms/recoliAtoms';

import React from 'react';
import Markdown from 'react-markdown';
import axios from 'axios';
import remarkGfm from 'remark-gfm';
import { useSuspenseQuery } from '@tanstack/react-query';

interface LeftBarProps {
  leftWidth: number;
  handleMouseDown: (e: React.MouseEvent) => void;
}

const LeftBar: React.FC<LeftBarProps> = ({ leftWidth, handleMouseDown }) => {
  const isDarkMode = useRecoilValue(isDarkModeState);

  const getQuestion = async () => {
    try {
      const result = await axios.get(
        'https://hongsam-ide.s3.ap-northeast-2.amazonaws.com/admin/q2/Question.md',
      );
      return result.data;
    } catch (error) {
      return '문제 불러오기 실패했습니다';
    }
  };
  const question = useSuspenseQuery({
    queryKey: ['question'],
    queryFn: () => getQuestion(),
  });

  return (
    <div
      style={{ height: 'calc(100vh - 49px)', width: `${leftWidth}%`, marginTop: '49px' }}
      className={cn(
        'border-r overflow-y-scroll border-main-color relative flex',
        isDarkMode ? 'bg-black text-white' : 'bg-white',
      )}
    >
      {!question.isLoading ? (
        <Markdown className={'flex flex-col gap-3 m-3 w-full'} remarkPlugins={[remarkGfm]}>
          {question.data}
        </Markdown>
      ) : (
        <p>...Loading</p>
      )}

      <div
        className='w-2 absolute right-0 h-screen cursor-col-resize z-50'
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};
export default LeftBar;
