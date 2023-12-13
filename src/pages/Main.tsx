import React from 'react';
import CodeEditor from '../components/article-components/CodeEditor';
import LeftBar from '../components/article-components/LeftBar';
import Terminal from '../components/article-components/Terminal';
import IdeHeader from '../components/article-components/IdeHeader';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { questionIdState, roomIdState, uuidState } from '../atoms/recoliAtoms';
import Chat from '../components/article-components/Chat/Chat';

const Main = () => {
  const { uuidParam, questionIdParam } = useParams();
  const setUuid = useSetRecoilState(uuidState);
  const setQuestionId = useSetRecoilState(questionIdState);
  const setRoomId = useSetRecoilState(roomIdState);
  React.useEffect(() => {
    if (uuidParam && questionIdParam) {
      setUuid(uuidParam);
      setQuestionId(questionIdParam);
      setRoomId(uuidParam + questionIdParam);
    }
  }, [uuidParam, questionIdParam]);
  const [leftWidth, setLeftWidth] = React.useState<number>(30); // 초기 왼쪽 너비 설정
  const [rightWidth, setRightWidth] = React.useState<number>(100 - leftWidth);
  const [isResizing, setIsResizing] = React.useState(false);

  React.useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return;
      const totalWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / totalWidth) * 100;
      setLeftWidth(newLeftWidth);
      const newRightWidth = 100 - newLeftWidth;
      setRightWidth(newRightWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <div className='flex'>
      <IdeHeader />
      <LeftBar leftWidth={leftWidth} handleMouseDown={handleMouseDown} />
      <div style={{ height: 'calc(100vh - 49px)', width: `${rightWidth}%`, marginTop: '49px' }}>
        <CodeEditor />
        <Terminal />
        <Chat />
      </div>
    </div>
  );
};
export default Main;
