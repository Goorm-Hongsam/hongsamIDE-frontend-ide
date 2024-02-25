import React, { FC } from 'react';
import Button from '../atom-components/Button';

import { isDarkModeState } from '../../atoms/recoliAtoms';
import { useRecoilValue } from 'recoil';
import { cn } from '../../utils/cn';
import ToolTip from '../atom-components/ToolTip';
import { copyUrlToClipboard } from '../../utils/copyUrl';

const IdeFooter: FC = () => {
  const [urlCopideView, setUrlCopideView] = React.useState<boolean>(false);
  // const [isChatView, setIsChatView] = React.useState(false);

  const isDarkMode = useRecoilValue(isDarkModeState);
  // const openChating = () => {
  //   setIsChatView(!isChatView);
  // };

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
        'flex h-12 gap-5 fixed bottom-0 z-20 w-screen pr-5 border-t border-main-color bg-white',
        isDarkMode ? 'bg-black text-white' : 'bg-white',
      )}
    >
      <div className='grow relative' />
      {/* {isChatView && <Chat />} */}
      <div className='h-full flex items-center justify-center'>
        {urlCopideView && <ToolTip label='복사 완료' position={'top'} />}

        <Button label='공유' onClick={() => copyUrlToClipboard(setUrlCopideView)} />
      </div>
      {/* <Button label='채팅' onClick={openChating} /> */}
    </div>
  );
};

export default IdeFooter;
