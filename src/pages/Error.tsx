import { useNavigate } from 'react-router-dom';
interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  const navigate = useNavigate();

  const goToMainPage = () => {
    // 서브도메인으로 이동
    navigate('https://main.hong-sam.online/question');
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
      <div className='max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='text-3xl font-bold text-red-500 mb-4'>Error</h1>
        <p className='text-lg mb-6'>{message}</p>
        <button
          onClick={goToMainPage}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300'
        >
          Go to Main Page
        </button>
      </div>
    </div>
  );
}

export default Error;
