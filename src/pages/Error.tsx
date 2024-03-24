import React from 'react';
import { useParams } from 'react-router-dom';

// interface ErrorProps {
//   message: string;
// }

function Error() {
  const { status } = useParams();
  const goToMainPage = () => {
    // 서브도메인으로 이동
    window.location.href = 'https://main.hong-sam.online/question';
  };
  console.log(status);

  if (status)
    return (
      <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
        <div className='p-8 bg-white shadow-lg rounded-lg'>
          <h1 className='text-3xl font-bold text-red-500 mb-4'>{status} Error 😥</h1>
          {+status === 500 && <p className='text-lg mb-6'>예상치 못한 문제가 발생했습니다.</p>}
          {+status === 403 && <p className='text-lg mb-6'>본인의 문제에만 접근할 수 있습니다.</p>}
          {+status === 401 && (
            <React.Fragment>
              <p className='text-lg mb-6'>현재 세션이 만료되었거나 인증에 실패했습니다.</p>
              <p className='text-lg mb-6'>다시 로그인하고 시도해주세요.</p>
            </React.Fragment>
          )}

          <button
            onClick={goToMainPage}
            className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300'
          >
            Go to Main Page
          </button>
        </div>
      </div>
    );
}

export default Error;
