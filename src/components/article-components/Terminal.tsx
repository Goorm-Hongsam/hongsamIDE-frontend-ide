import { useRecoilValue } from 'recoil';
import { cn } from '../../utils/cn';
import { isDarkModeState } from '../../atoms/recoliAtoms';

const Terminal = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  return (
    <div
      style={{ height: '203px' }}
      className={cn(
        'bottom-0 right-0 mb-12 bg-white p-5 border-t border-main-color',
        isDarkMode ? 'bg-black text-white ' : 'bg-white',
      )}
    >
      터미널
    </div>
  );
};
export default Terminal;
