import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { senderState } from '../atoms/recoliAtoms';

interface GuestProps {
  setSender?: React.Dispatch<React.SetStateAction<string>>;
}
const Guest: React.FC<GuestProps> = () => {
  const setSender = useSetRecoilState(senderState);
  const navigate = useNavigate();
  const [guestName, setGeustName] = useState('');
  const { uuidParam, questionIdParam } = useParams();

  const getGuestSendName = async () => {
    await setSender(guestName);
    navigate(`/${uuidParam}/${questionIdParam}`);
  };
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-5 bg-zinc-800 text-white text-center'>
      <h1 className='text-lg'>
        게스트로 입장합니다. <br /> 채팅방에서 사용하실 닉네임을 입력해주세요.
      </h1>
      <input
        value={guestName}
        onChange={(e) => {
          setGeustName(e.target.value);
        }}
        className='rounded-md text-black p-1 text-center'
        type='text'
      />
      <button onClick={getGuestSendName}>확인</button>
    </div>
  );
};
export default Guest;
