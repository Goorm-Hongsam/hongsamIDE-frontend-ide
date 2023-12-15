import React, { useEffect } from 'react';
import CodeEditor from '../components/article-components/CodeEditor';
import LeftBar from '../components/article-components/LeftBar';
import Terminal from '../components/article-components/Terminal';
import IdeHeader from '../components/article-components/IdeHeader';
import IdeFooter from '../components/article-components/IdeFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  codeState,
  questionIdState,
  roomIdState,
  senderState,
  uuidState,
} from '../atoms/recoliAtoms';

import axios from 'axios';
import useCodeSubmit from '../hooks/useCodeSubmit';
import javaDefaultValue from '../utils/Editor/defaultCode';

const Main = () => {
  const navigate = useNavigate();
  const { uuidParam, questionIdParam } = useParams();
  const setUuid = useSetRecoilState(uuidState);
  const setQuestionId = useSetRecoilState(questionIdState);
  const setRoomId = useSetRecoilState(roomIdState);
  const [sender, setSender] = useRecoilState(senderState);
  const { fetchCode } = useCodeSubmit();
  const setCode = useSetRecoilState(codeState);

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

  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const firstChild = ref.current?.children[0] as HTMLDivElement;
    const secondChild = ref.current?.children[1] as HTMLDivElement;
    if (firstChild) {
      firstChild.style.height = '70%';
    }
    if (secondChild) {
      secondChild.style.height = '30%';
    }
  }, []);
  return (
    <div className='flex'>
      <IdeHeader />
      <LeftBar leftWidth={leftWidth} handleMouseDown={handleMouseDown} />
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
        <Terminal />
      </div>
      <IdeFooter />
    </div>
  );
};
export default Main;
