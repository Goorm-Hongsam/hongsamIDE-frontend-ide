import { useRecoilValue } from 'recoil';
import { cn } from '../../utils/cn';
import { isDarkModeState } from '../../atoms/recoliAtoms';

interface LeftBarProps {
  leftWidth: number;
  handleMouseDown: (e: React.MouseEvent) => void;
}

const LeftBar: React.FC<LeftBarProps> = ({ leftWidth, handleMouseDown }) => {
  const isDarkMode = useRecoilValue(isDarkModeState);
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
