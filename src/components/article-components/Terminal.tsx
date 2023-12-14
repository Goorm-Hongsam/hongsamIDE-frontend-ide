import { useRecoilValue } from 'recoil';
import { cn } from '../../utils/cn';
import { isDarkModeState } from '../../atoms/recoliAtoms';

const Terminal = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  return (
    <div
      style={{ height: '20%' }}
      className={cn(
        'bottom-0 right-0 bg-white z-50 p-5 border-t border-main-color',
        isDarkMode ? 'bg-black text-white ' : 'bg-white',
      )}
    >
      터미널
    </div>
  );
};
export default Terminal;
