import React from 'react';
import './styles/App.css';
import Main from './pages/Main';
import { Route, Routes } from 'react-router-dom';
import Guest from './pages/Guest';
import { useCookies } from 'react-cookie';
import { getCookie } from './utils/cookie';

function App() {
  const [cookies] = useCookies();
  console.log(cookies);
  console.log(getCookie('Authorization'));
  React.useEffect(() => {
    const token = cookies.Authorization;
    console.log(token);
    if (token) {
      // 토큰이 존재하면 로컬 스토리지에 저장
      localStorage.setItem('token', token);
    }
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
