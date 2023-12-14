import React from 'react';
import CodeEditor from '../components/article-components/CodeEditor';
import LeftBar from '../components/article-components/LeftBar';
import Terminal from '../components/article-components/Terminal';
import IdeHeader from '../components/article-components/IdeHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { questionIdState, roomIdState, senderState, uuidState } from '../atoms/recoliAtoms';
import Chat from '../components/article-components/Chat/Chat';
import axios from 'axios';

const Main = () => {
  const navigate = useNavigate();
  const { uuidParam, questionIdParam } = useParams();
  const setUuid = useSetRecoilState(uuidState);
  const setQuestionId = useSetRecoilState(questionIdState);
  const setRoomId = useSetRecoilState(roomIdState);
  const [sender, setSender] = useRecoilState(senderState);

  const fetchUserName = async () => {
    await axios
      .get('https://api.hong-sam.online/', { withCredentials: true })
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
      setUuid(uuidParam);
      setQuestionId(questionIdParam);
      setRoomId(uuidParam + questionIdParam);
    }
  }, [uuidParam, questionIdParam]);

  //IDE페이지 진입 시 url로 받아온 Params를 이용하여 RoomId와 uuid를 초기화해준다
  React.useEffect(() => {
    fetchUserName();
  }, []);
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
