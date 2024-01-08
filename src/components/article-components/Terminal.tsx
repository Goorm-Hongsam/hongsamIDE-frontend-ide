import { cn } from '../../utils/cn';

import LodadingIcon from '../atom-components/icon/LoadingIcon';
import useCodeSubmit from '../../hooks/useCodeSubmit';
import useDarkMode from '../../hooks/useDarkMode';
import { useEffect, useState } from 'react';

const Terminal = () => {
  const { result } = useCodeSubmit();
  const [isLoading, setIsLoading] = useState(false);
  const { darkModeClasses } = useDarkMode();
  useEffect(() => {
    if (result === '') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [result]);
  return (
    <div
      style={{ height: '203px' }}
      className={cn('bottom-0 right-0 mb-12 bg-white p-5', darkModeClasses)}
    >
      {isLoading ? <LodadingIcon /> : <p>{result}</p>}
    </div>
  );
};
export default Terminal;
