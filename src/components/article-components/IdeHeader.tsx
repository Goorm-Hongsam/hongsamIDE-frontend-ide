import React, { useEffect, useState } from 'react';
import styles from './IdeHeader.module.css';

const IdeHeader = () => {
  const [urlCopideView, setUrlCopideView] = useState(false);

  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setUrlCopideView(true);
      })
      .catch((error) => {
        console.error('URL 복사 중 오류 발생:', error);
        alert('URL을 복사하는 중 오류가 발생했습니다.');
      });
  };

  useEffect(() => {
    if (urlCopideView) {
      setTimeout(() => {
        setUrlCopideView(false);
      }, 2000);
    }
  }, [urlCopideView]);
  return (
    <div
      className={`${styles.IdeTopBarContainer} flex items-center fixed w-screen z-10 border-b bg-white`}
    >
      <a href='https://main.hong-sam.online/question'>
        <p className={`${styles.IdeTopBarHeader} text-2xl pl-5 p-2`}>Hongsam IDE</p>
      </a>
      <div className='ml-5'></div>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <div className='relative'>
          <button onClick={copyUrlToClipboard}>Share</button>
          {urlCopideView ? (
            <div className={`${styles.CopySuccess} rounded-md absolute text-sm`}>url 복사 완료</div>
          ) : null}
        </div>
        <button>Save</button>
        <button>Pull</button>
        <button>Run</button>
      </div>
    </div>
  );
};

export default IdeHeader;
