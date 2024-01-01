import React from 'react';
import Button from '../atom-components/Button';
import { isDarkModeState } from '../../atoms/recoliAtoms';
import { useRecoilState } from 'recoil';
import useCodeSubmit from '../../hooks/useCodeSubmit';
import { copyUrlToClipboard } from '../../utils/copyUrl';
import { cn } from '../../utils/cn';
import SunIcon from '../atom-components/icon/SunIcon';
import MoonIcon from '../atom-components/icon/MoonIcon';
import ToolTip from '../atom-components/ToolTip';

const IdeHeader: React.FC = () => {
  const [urlCopideView, setUrlCopideView] = React.useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);
  const { submitCode, saveCode } = useCodeSubmit();

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
        <div className='flex flex-col items-center'>
          <Button label='Share' onClick={() => copyUrlToClipboard(setUrlCopideView)} />
          {urlCopideView && <ToolTip label='복사 완료' background={'ligth'} />}
        </div>
        <Button label='Run' onClick={submitCode} />
        <Button label='Save' onClick={saveCode} />
      </div>
    </div>
  );
};

export default IdeHeader;
