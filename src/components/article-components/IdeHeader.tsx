import React from 'react';
import Button from '../atom-components/Button';
import { isDarkModeState } from '../../atoms/recoliAtoms';
import { useRecoilState } from 'recoil';
import useCodeSubmit from '../../hooks/useCodeSubmit';

import { cn } from '../../utils/cn';
import SunIcon from '../atom-components/icon/SunIcon';
import MoonIcon from '../atom-components/icon/MoonIcon';

import useDarkMode from '../../hooks/useDarkMode';

const IdeHeader: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);
  const { submitCode, testCode, saveCode } = useCodeSubmit();

  const { darkModeClasses } = useDarkMode();

  return (
    <div
      className={cn(
        'flex items-center fixed w-screen z-10 border-b border-main-color',
        darkModeClasses,
      )}
    >
      <div className='flex items-center justify-center gap-3'>
        <a href='https://main.hong-sam.online/question'>
          <p className={`text-2xl pl-5 p-2 text-main-color`}>Hongsam IDE</p>
        </a>
        <Button
          children={isDarkMode ? <SunIcon /> : <MoonIcon />}
          size={'rounded'}
          onClick={() => {
            setIsDarkMode(!isDarkMode);
          }}
        />
      </div>
      <div className='ml-5'></div>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <Button label='저장' onClick={saveCode} />
        <Button label='실행' onClick={testCode} />
        <Button label='제출' onClick={submitCode} />
      </div>
    </div>
  );
};

export default IdeHeader;
