import { useRecoilValue } from 'recoil';
import { cn } from '../../utils/cn';
import { isDarkModeState } from '../../atoms/recoliAtoms';
import questionAxios from '../../api/questionAxios';
import { useEffect } from 'react';

interface LeftBarProps {
  leftWidth: number;
  handleMouseDown: (e: React.MouseEvent) => void;
}

const LeftBar: React.FC<LeftBarProps> = ({ leftWidth, handleMouseDown }) => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  const getQuestion = async () => {
    try {
      const result = await questionAxios('');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div
      style={{ height: 'calc(100vh - 49px)', width: `${leftWidth}%`, marginTop: '49px' }}
      className={cn(
        'p-5 border-r overflow-y-scroll border-main-color relative',
        isDarkMode ? 'bg-black text-white' : 'bg-white',
      )}
    >
      <h1>문제이름</h1>
      <div
        style={{ right: '-2px' }}
        className='w-2 absolute right-0 h-screen cursor-col-resize'
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};
export default LeftBar;
