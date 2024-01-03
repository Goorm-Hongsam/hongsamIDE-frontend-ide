import { cn } from '../../utils/cn';
import React from 'react';
import Markdown from 'react-markdown';
import axios from 'axios';
import remarkGfm from 'remark-gfm';
import { useSuspenseQuery } from '@tanstack/react-query';
import useDarkMode from '../../hooks/useDarkMode';

interface LeftBarProps {
  leftWidth: number;
  handleMouseDown: (e: React.MouseEvent) => void;
}

const LeftBar: React.FC<LeftBarProps> = ({ leftWidth, handleMouseDown }) => {
  const { darkModeClasses } = useDarkMode();
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
      style={{
        width: `${leftWidth}%`,
        marginTop: '49px',
        marginBottom: '47px',
      }}
      className={cn('border-r overflow-y-scroll border-main-color relative flex', darkModeClasses)}
    >
      {!question.isLoading ? (
        <Markdown className={'flex flex-col gap-3 m-3 w-full'} remarkPlugins={[remarkGfm]}>
          {question.data}
        </Markdown>
      ) : (
        <p>...Loading</p>
      )}

      <div
        className='w-2 absolute right-0 h-screen cursor-col-resize'
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};
export default LeftBar;
