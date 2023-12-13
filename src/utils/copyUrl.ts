export const copyUrlToClipboard = (setView: React.Dispatch<React.SetStateAction<boolean>>) => {
  const currentUrl = window.location.href;
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      setView(true);
      console.log(currentUrl);
    })
    .catch((error) => {
      console.error('URL 복사 중 오류 발생:', error);
      alert('URL을 복사하는 중 오류가 발생했습니다.');
    });
};
