import { cn } from '../../utils/cn';
import React from 'react';
import Markdown from 'react-markdown';
import axios from 'axios';
import remarkGfm from 'remark-gfm';
import { useSuspenseQuery } from '@tanstack/react-query';
import useDarkMode from '../../hooks/useDarkMode';
import { useParams } from 'react-router-dom';

interface LeftBarProps {
  leftWidth: number;
  handleMouseDown: (e: React.MouseEvent) => void;

  isWidthResizing: boolean;
}

const LeftBar: React.FC<LeftBarProps> = ({ leftWidth, handleMouseDown, isWidthResizing }) => {
  const { questionIdParam } = useParams();

  const { darkModeClasses } = useDarkMode();
  const getQuestion = async () => {
    try {
      const result = await axios.get(
        `https://hongsam-ide.s3.ap-northeast-2.amazonaws.com/admin/${questionIdParam}/Question.md`,
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
        height: 'calc(100vh - 96px)',
      }}
      className={cn('border-r overflow-y-scroll border-main-color flex relative', darkModeClasses)}
    >
      {!question.isLoading ? (
        <Markdown className={'flex flex-col gap-3 p-3 w-full'} remarkPlugins={[remarkGfm]}>
          {question.data}
        </Markdown>
      ) : (
        <p>...Loading</p>
      )}
      <div
        className={cn(
          'w-2 sticky top-0 right-0 h-screen cursor-col-resize',
          isWidthResizing && 'bg-main-color',
        )}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};
export default LeftBar;
