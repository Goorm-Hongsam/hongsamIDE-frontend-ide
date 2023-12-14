import React from 'react';
import Button from '../atom-components/Button';
import { codeState, isDarkModeState } from '../../atoms/recoliAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import useCodeSubmit from '../../hooks/useCodeSubmit';
import { copyUrlToClipboard } from '../../utils/copyUrl';
import { cn } from '../../utils/cn';
import SunIcon from '../atom-components/icon/SunIcon';
import MoonIcon from '../atom-components/icon/MoonIcon';

const IdeHeader: React.FC = () => {
  const [urlCopideView, setUrlCopideView] = React.useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);
  const { submitCode } = useCodeSubmit();
  const code = useRecoilValue(codeState);

  React.useEffect(() => {
    if (urlCopideView) {
      setTimeout(() => {
        setUrlCopideView(false);
      }, 2000);
    }
  }, [urlCopideView]);

  return (
    <div
      className={cn(
        'flex items-center fixed w-screen z-10 border-b border-main-color',
        isDarkMode ? 'bg-black text-white ' : 'bg-white',
      )}
    >
      <div className='flex items-center justify-center gap-3'>
        <a href='https://main.hong-sam.online/question'>
          <p className={`text-2xl pl-5 p-2 text-main-color`}>Hongsam IDE</p>
        </a>
        <Button
          children={isDarkMode ? <SunIcon /> : <MoonIcon />}
          // variant={isDarkMode ? 'main' : 'white'}
          size={'rounded'}
          onClick={() => {
            setIsDarkMode(!isDarkMode);
          }}
        />
      </div>
      <div className='ml-5'></div>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <div className='flex flex-col items-center '>
          <Button label='Share' onClick={() => copyUrlToClipboard(setUrlCopideView)} />
          {urlCopideView ? (
            <p
              className={cn(
                `rounded-md fixed top-10 text-sm bg-white p-1 w-24 text-center border border-main-color`,
                isDarkMode ? 'bg-black text-white ' : 'bg-white',
              )}
            >
              url 복사 완료
            </p>
          ) : null}
        </div>

        <Button
          label='Run'
          onClick={() => {
            submitCode(code);
          }}
        />
        <Button label='Save' />
      </div>
    </div>
  );
};

export default IdeHeader;
