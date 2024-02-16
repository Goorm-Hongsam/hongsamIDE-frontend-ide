import { cn } from '../../utils/cn';

import LoadingIcon from '../atom-components/icon/LoadingIcon';
import useCodeSubmit from '../../hooks/useCodeSubmit';
import useDarkMode from '../../hooks/useDarkMode';

import { useRecoilValue } from 'recoil';
import { isResultLoadingState } from '../../atoms/recoliAtoms';

const Terminal = () => {
  const { result, resultObj } = useCodeSubmit();
  const { darkModeClasses } = useDarkMode();
  const isResultLoading = useRecoilValue(isResultLoadingState);

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
        {result}
      </div>
    );
  }
  if (resultObj.errorMessage) {
    return (
      <div
        style={{ height: '203px' }}
        className={cn(
          'bottom-0 right-0 mb-12 bg-white p-5 overflow-y-auto flex flex-col gap-5',
          darkModeClasses,
        )}
      >
        {resultObj.errorMessage}
      </div>
    );
  }

  if (resultObj) {
    return (
      <div
        style={{ height: '203px' }}
        className={cn(
          'bottom-0 right-0 mb-12 bg-white p-5 overflow-y-auto flex flex-col gap-5',
          darkModeClasses,
        )}
      >
        {resultObj.printResult.map((_, i) => {
          return (
            <div key={i} className='flex flex-col'>
              <p className='text-lg'>테스트 {i + 1}</p>
              <div className='flex gap-5'>
                <p className='text-slate-500'>입력 값</p>
                <p></p>
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>기댓 값</p>
                <p>{resultObj.originAnswer[i]}</p>
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>실행 결과</p>
                {resultObj.correctResult[i] ? (
                  <p className='text-blue-400'>테스트케이스 정답입니다.</p>
                ) : (
                  <p className='text-red-400'>
                    실행한 출력 값 "{resultObj.printResult[i]}"와 기댓 값 "
                    {resultObj.originAnswer[i]}" 가 다릅니다
                  </p>
                )}
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>출력</p>
                <p>{resultObj.printResult[i]}</p>
              </div>
              <div className='flex gap-5'>
                <p className='text-slate-500'>소요 시간</p>
                <p>{resultObj.timeResult[i]}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Terminal;
