import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '../atoms/recoliAtoms';
import React from 'react';

const useDarkMode = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  const [darkModeClasses, setDarkModeClasses] = React.useState('bg-white text-black');
  React.useEffect(() => {
    isDarkMode
      ? setDarkModeClasses('bg-black text-white')
      : setDarkModeClasses('bg-white text-black');
  }, [isDarkMode]);

  return { darkModeClasses };
};

export default useDarkMode;
