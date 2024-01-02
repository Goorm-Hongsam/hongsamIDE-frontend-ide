import { useRecoilValue } from 'recoil';
import { cn } from '../../utils/cn';
import { isDarkModeState } from '../../atoms/recoliAtoms';

import LodadingIcon from '../atom-components/icon/LoadingIcon';
import useCodeSubmit from '../../hooks/useCodeSubmit';

const Terminal = () => {
  const { result, isResultLoading } = useCodeSubmit();

  const isDarkMode = useRecoilValue(isDarkModeState);
  return (
    <div
      style={{ height: '203px' }}
      className={cn(
        'bottom-0 right-0 mb-12 bg-white p-5',
        isDarkMode ? 'bg-black text-white ' : 'bg-white',
      )}
    >
      {isResultLoading ? <LodadingIcon /> : <p>{result}</p>}
    </div>
  );
};
export default Terminal;
