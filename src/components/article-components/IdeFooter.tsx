import React, { FC } from 'react';
import Button from '../atom-components/Button';
import Chat from './Chat/Chat';
import { isDarkModeState } from '../../atoms/recoliAtoms';
import { useRecoilState } from 'recoil';
import { cn } from '../../utils/cn';

const IdeFooter: FC = () => {
  const [isChatView, setIsChatView] = React.useState(false);
  const isDarkMode = useRecoilState(isDarkModeState);
  const openChating = () => {
    setIsChatView(!isChatView);
  };
  return (
    <div
      className={cn(
        'flex h-12 gap-5 fixed bottom-0 z-50 w-screen pr-5 border-t border-main-color bg-white',
        isDarkMode ? 'bg-black text-white ' : 'bg-white',
      )}
    >
      <div className='grow' />
      {isChatView && <Chat />}
      <Button label='Chat' onClick={openChating} />
    </div>
  );
};

export default IdeFooter;
