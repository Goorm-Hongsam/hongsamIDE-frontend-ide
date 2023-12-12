import React from 'react';
import Button from '../atom-components/Button';

const IdeHeader: React.FC = () => {
  const [urlCopideView, setUrlCopideView] = React.useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setUrlCopideView(true);
        console.log(currentUrl);
      })
      .catch((error) => {
        console.error('URL 복사 중 오류 발생:', error);
        alert('URL을 복사하는 중 오류가 발생했습니다.');
      });
  };

  // React.useEffect(() => {
  //   if (urlCopideView) {
  //     setTimeout(() => {
  //       setUrlCopideView(false);
  //     }, 2000);
  //   }
  // }, [urlCopideView]);

  return (
    <div className={`flex items-center fixed w-screen z-10 border-b bg-white`}>
      <a href='https://main.hong-sam.online/question'>
        <p className={`text-2xl pl-5 p-2 text-main-color`}>Hongsam IDE</p>
      </a>
      <div className='ml-5'></div>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <div className='flex flex-col items-center'>
          <button onClick={copyUrlToClipboard}>Share</button>
          {urlCopideView ? (
            <p
              className={`rounded-md fixed top-10 text-sm bg-white p-1 w-24 text-center border border-main-color`}
            >
              url 복사 완료
            </p>
          ) : null}
        </div>
        <Button label={true ? '🌙' : '☀️'} />
        <Button label='Run' />
        <Button
          label='Save'
          tooltipElement={
            <p
              className={`rounded-md fixed top-10 text-sm bg-white p-1 w-24 text-center border border-main-color`}
            >
              url 복사 완료
            </p>
          }
          onClick={copyUrlToClipboard}
        />
      </div>
    </div>
  );
};

export default IdeHeader;
