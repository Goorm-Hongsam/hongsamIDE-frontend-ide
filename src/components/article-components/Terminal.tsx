import { cn } from '../../utils/cn';

import LoadingIcon from '../atom-components/icon/LoadingIcon';
import useCodeSubmit from '../../hooks/useCodeSubmit';
import useDarkMode from '../../hooks/useDarkMode';

import { useRecoilValue } from 'recoil';
import { isResultLoadingState } from '../../atoms/recoliAtoms';
import React from 'react';

const Terminal = () => {
  const termilnalRef = React.useRef<HTMLDivElement | null>(null);
  const { result, resultObj } = useCodeSubmit();
  const { darkModeClasses } = useDarkMode();
  const isResultLoading = useRecoilValue(isResultLoadingState);

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isCompiling, setIsCompiling] = React.useState(true);
  // const [time, setTime] = React.useState<number>(0);
  const [correctCount, setCorrectCount] = React.useState<number>(0);
  const [incorrectCount, setIncorrectCount] = React.useState<number>(0);
  const [isResultCorrect, setIsResultCorrect] = React.useState<boolean>(true);

  React.useEffect(() => {
    setCorrectCount(0);
    setIncorrectCount(0);
    if (!resultObj.compileError) {
      resultObj.correctResult.forEach((result) => {
        if (result) {
          setCorrectCount((prevIndex) => prevIndex + 1);
        }
        if (!result) {
          setIncorrectCount((prevIndex) => prevIndex + 1);
        }
      });
      // if (!incorrectCount) setIsCorrect(true);
    }

    if (!resultObj.compileError) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < resultObj.printResult.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 1000);

      return () => {
        setCurrentIndex(0);
        clearInterval(interval);
      };
    }
  }, [resultObj]);
  console.log(resultObj);
  React.useEffect(() => {
    if (!resultObj.compileError) {
      // const time = resultObj.timeResult[currentIndex] / 10;
      // setTime(time);
      const maxIndex = resultObj.timeResult.length - 1;
      if (termilnalRef.current) {
        termilnalRef.current.scrollTo({
          top: termilnalRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
      if (currentIndex !== maxIndex) {
        setIsCompiling(true);
      }
      if (currentIndex === maxIndex) {
        setIsCompiling(false);
      }

      if (incorrectCount !== 0) setIsResultCorrect(false);
      if (incorrectCount === 0) setIsResultCorrect(true);
    }
  }, [currentIndex]);

  if (isResultLoading) {
    return (
      <div
        style={{ height: '203px' }}
        className={cn(
          'bottom-0 right-0 mb-12 bg-white p-5 overflow-y-auto flex flex-col gap-5',
          darkModeClasses,
        )}
      >
        <LoadingIcon />
      </div>
    );
  }

  if (result !== '') {
    return (
      <div
        style={{ height: '203px' }}
        className={cn(
          'bottom-0 right-0 mb-12 bg-white p-5 overflow-y-auto flex flex-col gap-5',
          darkModeClasses,
        )}
      >
        <p className='text-green-500 text-xl'>실행 결과</p>
        {result}
      </div>
    );
  }
  if (resultObj.compileError) {
    return (
      <div
        style={{ height: '203px' }}
        className={cn(
          'bottom-0 right-0 mb-12 bg-white p-5 overflow-y-auto flex flex-col gap-5',
          darkModeClasses,
        )}
      >
        <p className='text-red-500 text-xl'>에러 입니다 !!</p>
        <p className='text-lg'>{resultObj.errorMessage}</p>
      </div>
    );
  }

  if (resultObj) {
    const maxIndex = resultObj.printResult.length - 1;
    const maxLength = resultObj.printResult.length;
    return (
      <div
        ref={termilnalRef}
        style={{ height: '203px' }}
        className={cn(
          'question-font bottom-0 right-0 mb-12 bg-white p-5 overflow-y-auto flex flex-col gap-5 transition-all',
          darkModeClasses,
        )}
      >
        {resultObj.printResult.slice(0, currentIndex + 1).map((_, i) => {
          const time = resultObj.timeResult[i];
          const result = resultObj.originAnswer[i];
          const print = resultObj.printResult[i];
          const isCorrect = resultObj.correctResult[i];
          return (
            <div
              key={i}
              className={cn('flex flex-col gap-1 bg-gray-200 p-3 rounded-md text-black')}
            >
              {maxLength === 2 ? (
                <p className='text-lg mb-2'>실행 테스트 케이스 {i + 1}</p>
              ) : (
                <p className='text-lg mb-2'>제출 테스트 케이스 {i + 1}</p>
              )}

              <div className='flex gap-5'>
                <p className='text-slate-500'>입력 값</p>
                <p></p>
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>기댓 값</p>
                <p>{result}</p>
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>실행 결과</p>
                {isCorrect ? (
                  <p className='text-blue-400'>테스트케이스 정답입니다.</p>
                ) : (
                  <p className='text-red-400'>
                    실행한 출력 값 "{print}"와 기댓 값 "{result}" 가 다릅니다
                  </p>
                )}
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>출력 값</p>
                <p>{print}</p>
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>소요 시간</p>
                <p>{time}(nano second/NS)</p>
              </div>
            </div>
          );
        })}
        <div className={`w-full ${!isCompiling && 'hidden'}`}>
          <div className={`h-1.5 w-full bg-green-100 overflow-hidden`}>
            <div className='progress w-full h-full bg-green-500 left-right'></div>
          </div>
        </div>
        {currentIndex === maxIndex && (
          <div className='py-5 flex flex-col gap-2 bg-gray-200 p-3 text-black rounded-md'>
            <p className='text-lg'>{maxLength === 2 ? '테스트' : '채점'} 결과</p>
            <p className='text-blue-400'>
              {maxLength}개 중 {correctCount}개 맞았습니다 !
            </p>
            <p className='text-red-400'>
              {maxLength}개 중 {incorrectCount}개 틀렸습니다 !
            </p>
            {isResultCorrect ? '맞음' : '틀림'}
          </div>
        )}
      </div>
    );
  }
};
export default Terminal;
