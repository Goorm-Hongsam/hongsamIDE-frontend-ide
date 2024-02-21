import { cn } from '../../utils/cn';
import React from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useDarkMode from '../../hooks/useDarkMode';
import useQuestionFetch from '../../hooks/Question/useQuestionFetch';
import LoadingIcon from '../atom-components/icon/LoadingIcon';

interface LeftBarProps {
  leftWidth: number;
  handleMouseDown: (e: React.MouseEvent) => void;

  isWidthResizing: boolean;
}

const LeftBar: React.FC<LeftBarProps> = ({ leftWidth, handleMouseDown, isWidthResizing }) => {
  const { questionIdParam } = useParams<string>();
  const { darkModeClasses } = useDarkMode();
  const { questionQuery } = useQuestionFetch(questionIdParam!);

  if (questionQuery.isPending) {
    return (
      <div
        style={{
          width: `${leftWidth}%`,
          marginTop: '49px',
          marginBottom: '47px',
          height: 'calc(100vh - 96px)',
        }}
        className={cn(
          'question-font border-r overflow-y-scroll border-main-color flex relative',
          darkModeClasses,
        )}
      >
        <LoadingIcon />
      </div>
    );
  }
  if (questionQuery.data) {
    return (
      <div
        style={{
          width: `${leftWidth}%`,
          marginTop: '49px',
          marginBottom: '47px',
          height: 'calc(100vh - 96px)',
        }}
        className={cn(
          'question-font border-r overflow-y-scroll border-main-color flex relative',
          darkModeClasses,
        )}
      >
        <Markdown className={'flex flex-col gap-3 p-3 w-full h-full'} remarkPlugins={[remarkGfm]}>
          {questionQuery.data.data}
        </Markdown>
        <div
          style={{
            height: 'calc(100vh - 96px)',
          }}
          className={cn(
            'w-2 sticky top-0 right-0 cursor-col-resize flex items-center justify-center',
            isWidthResizing && 'bg-main-color',
          )}
          onMouseDown={handleMouseDown}
        >
          <div className='w-3 border-l-2 border-r-1 border-main-color h-10 hover:bg-main-color' />
        </div>
      </div>
    );
  }
};

export default LeftBar;
