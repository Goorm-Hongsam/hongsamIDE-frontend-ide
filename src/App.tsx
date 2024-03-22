import React from 'react';
import './styles/App.css';
import Main from './pages/Main';
import { Route, Routes } from 'react-router-dom';
import Guest from './pages/Guest';
import { useCookies } from 'react-cookie';
import { getCookie } from './utils/cookie';

function App() {
  const [cookies] = useCookies();
  console.log('useCookies : ', cookies);
  console.log('getGookie : ', getCookie('Authorization'));
  React.useEffect(() => {
    const token2 = getCookie('Authorization');
    console.log('token2 : ', token2);
    if (token2) {
      localStorage.setItem('Authorization', token2);
    }
    const token = cookies.Authorization;
    console.log('token : ', token);
    if (token) {
      // 토큰이 존재하면 로컬 스토리지에 저장
      localStorage.setItem('Authorization', token);
    }
    console.log('Authorization LocalStorage : ', localStorage.getItem('Authorization'));
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path='/:uuidParam/:questionIdParam' element={<Main />} />
        <Route path='/:uuidParam/:questionIdParam/guest' element={<Guest />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
