import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { IStompSocket } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import styles from './Chat.module.css';
import axios from 'axios';
import { isDarkModeState, roomIdState, senderState, uuidState } from '../../../atoms/recoliAtoms';
import { useRecoilValue } from 'recoil';
import { cn } from '../../../utils/cn';

interface MessageType {
  type: string;
  roomId: string;
  sender: string;
  message: string;
  date: string;
  time: string;
  uuid: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [stompClient, setStompClient] = React.useState<Client | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const uuid = useRecoilValue(uuidState);
  const roomId = useRecoilValue(roomIdState);
  const isDarkMode = useRecoilValue(isDarkModeState);
  const sender = useRecoilValue(senderState);

  React.useEffect(() => {
    console.log('uuid : ', uuid);
    console.log('roomId : ', roomId);
  }, []);
  React.useEffect(() => {
    // 렌더링 이후에 scrollContainerRef 설정
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]); // messages가 변경될 때 실행

  // // 메시지 보내기
  const sendMessage = () => {
    console.log('SEND!');
    if (stompClient && message) {
      console.log('SEND!');
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: `${roomId}`,
          sender: `${sender}`,
          message: message,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString().slice(0, -3),
          uuid: `${uuid}`,
        }),
      });
      setMessage('');
    }
  };
  const fetchMessages = () => {
    if (!isLoading) {
      setIsLoading(true);
      axios
        .get(`https://chat.hong-sam.online/chat/message/${roomId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const newMessages = response.data;
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  // WebSocket 연결 설정
  // React.useEffect(() => {
  //   // const socket = new SockJS('https://chat.hong-sam.online/ws/chat');
  //   // const client = new SockJS.Client();
  //   const stompClient = new Client();
  //   stompClient.brokerURL = 'ws://localhost:15674/ws';

  //   console.log(stompClient.brokerURL);
  //   // const webSocket = {
  //   //   send: (data: string) => socket.send(data), // 적절한 변환을 수행해야 함
  //   //   // 기타 필요한 메서드 추가
  //   // } as IStompSocket;
  //   // stompClient.webSocketFactory = () => webSocket;

  //   stompClient.onConnect = () => {
  //     // 입장 메시지 전송
  //     stompClient.publish({
  //       destination: '/pub/chat/message',
  //       body: JSON.stringify({
  //         type: 'ENTER',
  //         roomId: `${roomId}`,
  //         sender: `${sender}`,
  //         message: null, // 이름에 따라 다른 입장 메시지
  //         uuid: `${uuid}`,
  //       }),
  //     });
  //     setStompClient(stompClient);
  //   };
  //   stompClient.activate();
  //   // 컴포넌트가 마운트될 때 이전 대화 내용 불러오기 (추가)
  //   fetchMessages();

  //   return () => {
  //     if (stompClient) {
  //       stompClient.deactivate();
  //     }
  //   };
  // }, []); // 빈 배열로 설정하여 한 번만 실행

  useEffect(() => {
    const socket = new SockJS('https://chat.hong-sam.online/ws/chat');
    const stompClient = new Client();
    stompClient.webSocketFactory = () => socket as IStompSocket;
    stompClient.onConnect = () => {
      // 입장 메시지 전송
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'ENTER',
          roomId: `${roomId}`,
          sender: `${sender}`,
          message: null, // 이름에 따라 다른 입장 메시지
          uuid: `${uuid}`,
        }),
      });
      setStompClient(stompClient);
    };
    stompClient.activate();
    // 컴포넌트가 마운트될 때 이전 대화 내용 불러오기 (추가)
    fetchMessages();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []); // 빈 배열로 설정하여 한 번만 실행

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (frame) => {
        const receivedMessage = JSON.parse(frame.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }
  }, [stompClient]);

  return (
    <div
      className={cn(
        `w-72 fixed bottom-0 right-0 z-50 mb-14 mr-2 border border-main-color flex flex-col gap-3 rounded-md`,
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black',
      )}
    >
      <div className={`h-72 overflow-y-scroll p-3`} ref={scrollContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.type === 'ENTER'
                ? styles.enter
                : message.sender === `${sender}`
                ? styles.send
                : styles.receive
            }
          >
            {message.type === 'ENTER' ? (
              <div className={styles.enterMessage}>{message.message}</div>
            ) : message.sender === `${sender}` ? (
              <div className={styles.send}>
                <div className={styles.sender}>{message.sender}</div>
                <span className={styles.sendChat}>{message.message}</span>
                <div className={styles.time}>{message.time}</div>
              </div>
            ) : (
              <div className={styles.receive}>
                <div className={styles.receiver}>{message.sender}</div>
                <span className={styles.receiveChat}>{message.message}</span>
                <div className={styles.time}>{message.time}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`${styles.text} border-t border-main-color`}>
        <textarea
          placeholder='메시지를 입력해주세요.'
          value={message}
          className={` ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-black'}`}
          onChange={(e) => setMessage(e.target.value)}
          /**
           * 한글처럼 한 글자에 여러가지 문자가 담기는 경후 조합하는 동안에 한번 더 출력이 되는 경우가 생긴다고 한다
           */
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) {
              // isComposing 이 true 이면 조합 중이므로 동작을 막는다.
              return;
            }
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className={`${
            !message.trim() ? 'bg-zinc-900' : 'bg-main-color hover:bg-main-dark-color'
          }`}
          disabled={!message.trim()}
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Chat;
