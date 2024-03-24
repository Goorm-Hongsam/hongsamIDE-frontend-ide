import React from 'react';
import Button from './Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isResultCorrectState, isResultModalViewState } from '../../atoms/recoliAtoms';
import useDarkMode from '../../hooks/useDarkMode';
import { cn } from '../../utils/cn';

const Modal = () => {
  const backgroundRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const setIsResultModalView = useSetRecoilState(isResultModalViewState);
  const isResultCorrect = useRecoilValue(isResultCorrectState);
  const { darkModeClasses } = useDarkMode();

  React.useEffect(() => {
    const modalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target) {
            entry.target.classList.add('translate-y-10');
          }
        } else {
          if (entry.target) {
            entry.target.classList.remove('-translate-y-60');
          }
        }
      });
    });
    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target) {
            entry.target.classList.add('opacity-50', 'bg-black');
          }
        } else {
          if (entry.target) {
            entry.target.classList.remove('opacity-100');
          }
        }
      });
    });

    if (modalRef.current) {
      modalObserver.observe(modalRef.current);
    }

    if (backgroundRef.current) {
      backgroundObserver.observe(backgroundRef.current);
    }

    return () => {
      if (modalRef.current) {
        modalObserver.unobserve(modalRef.current);
      }
    };
  }, [modalRef, backgroundRef, setIsResultModalView]);

  const deleteModal = () => {
    setIsResultModalView(false);
  };
  const goToMainPage = () => {
    // 서브도메인으로 이동
    window.location.href = 'https://main.hong-sam.online/question';
  };

  return (
    <div className='w-screen h-screen flex justify-center absolute z-50 transition-all'>
      <div
        onClick={deleteModal}
        ref={backgroundRef}
        className='w-full h-full absolute opacity-100 transition-1s'
      />
      <div
        ref={modalRef}
        className={cn(
          darkModeClasses,
          `absolute border-main-color p-8 rounded-md flex items-center justify-center flex-col gap-5 shadow-lg transition-1s -translate-y-60 bg-white`,
        )}
      >
        {isResultCorrect ? (
          <p className='text-xl p-5 text-blue-400'>정답입니다 ! 😊</p>
        ) : (
          <p className='text-xl p-5 text-red-400'>틀렸습니다 ! 🥲</p>
        )}

        <div className='flex gap-3'>
          <Button label='닫기' variant={'alert'} onClick={deleteModal} />
          <Button label='다른 문제 풀러가기' variant={'main'} onClick={goToMainPage} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
