import React from 'react';
import CodeEditor from '../components/article-components/CodeEditor';
import LeftBar from '../components/article-components/LeftBar';
import Terminal from '../components/article-components/Terminal';
import IdeHeader from '../components/article-components/IdeHeader';
import IdeFooter from '../components/article-components/IdeFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  codeState,
  isDarkModeState,
  questionIdState,
  roomIdState,
  senderState,
  uuidState,
} from '../atoms/recoliAtoms';

import useCodeSubmit from '../hooks/useCodeSubmit';
import javaDefaultValue from '../utils/Editor/defaultCode';
import { cn } from '../utils/cn';
import defaultAxios from '../api/defaultAxios';

const Main = () => {
  const navigate = useNavigate();
  const { uuidParam, questionIdParam } = useParams();
  const setUuid = useSetRecoilState(uuidState);
  const setQuestionId = useSetRecoilState(questionIdState);
  const setRoomId = useSetRecoilState(roomIdState);
  const [sender, setSender] = useRecoilState(senderState);
  const { fetchCode } = useCodeSubmit();
  const setCode = useSetRecoilState(codeState);
  const isDarkMode = useRecoilValue(isDarkModeState);

  const fetchUserName = async () => {
    await defaultAxios
      .get('/')
      .then((res) => {
        if (res.data.status === 400 && sender) {
          return;
        } else if (res.data.status === 400) {
          alert(res.data.data);
          navigate(`/${uuidParam}/${questionIdParam}/guest`);
        } else if (res.data.status === 200) {
          setSender(res.data.data.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (uuidParam && questionIdParam) {
      const code = javaDefaultValue(questionIdParam);
      setUuid(uuidParam);
      setQuestionId(questionIdParam);
      setRoomId(uuidParam + questionIdParam);
      setCode(code);
      fetchCode(uuidParam, questionIdParam);
    }
  }, [uuidParam, questionIdParam]);

  //IDE페이지 진입 시 url로 받아온 Params를 이용하여 RoomId와 uuid를 초기화해준다
  React.useEffect(() => {
    fetchUserName();
  }, []);

  //좌우리사이징
  const [leftWidth, setLeftWidth] = React.useState<number>(30); // 초기 왼쪽 너비 설정
  const [rightWidth, setRightWidth] = React.useState<number>(100 - leftWidth);
  const [isWidthResizing, setIsWidthResizing] = React.useState(false);

  React.useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isWidthResizing) return;
      const totalWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / totalWidth) * 100;
      setLeftWidth(newLeftWidth);
      const newRightWidth = 100 - newLeftWidth;
      setRightWidth(newRightWidth);
    };

    const handleMouseUp = () => {
      setIsWidthResizing(false);
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    if (isWidthResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isWidthResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWidthResizing(true);
  };
  //높이리사이징
  const [topHeight, setTopHeight] = React.useState<number>(70);
  const [bottomHeight, setBottomHeight] = React.useState<number>(100 - topHeight);
  const [isHRisizing, setIsHRisizing] = React.useState(false);
  const handleHMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHRisizing(true);
  };

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isHRisizing) return;
      const totalHeiht = window.innerHeight;
      const newTopHeiht = (e.clientY / totalHeiht) * 100;
      setTopHeight(newTopHeiht);
      const newBottomHeiht = 100 - newTopHeiht;
      setBottomHeight(newBottomHeiht);
    };

    const handleMouseUp = () => {
      setIsHRisizing(false);
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    if (isHRisizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleMouseUp);
    }
    const firstChild = ref.current?.children[0] as HTMLDivElement;
    const secondChild = ref.current?.children[2] as HTMLDivElement;
    if (firstChild) {
      firstChild.style.height = `${topHeight}%`;
    }
    if (secondChild) {
      secondChild.style.height = `${bottomHeight}%`;
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHRisizing, topHeight]);

  return (
    <div className='flex'>
      <IdeHeader />
      <LeftBar
        leftWidth={leftWidth}
        handleMouseDown={handleMouseDown}
        isWidthResizing={isWidthResizing}
      />
      <div
        ref={ref}
        style={{
          height: 'calc(100vh - 96px)',
          width: `${rightWidth}%`,
          marginTop: '49px',
          marginBottom: '47px',
        }}
      >
        <CodeEditor />
        <div
          onMouseDown={handleHMouseDown}
          className={cn(
            'h-2 cursor-row-resize border-t border-main-color flex items-center justify-center',
            isDarkMode ? 'bg-black' : 'bg-white',
            isHRisizing && 'bg-main-color',
          )}
        >
          <div className='w-10 border-b-2 border-main-color h-2' />
        </div>
        <Terminal />
      </div>
      <IdeFooter />
    </div>
  );
};
export default Main;
