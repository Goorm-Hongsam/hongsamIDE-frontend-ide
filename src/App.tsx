import './styles/App.css';
import Main from './pages/Main';
import { Route, Routes } from 'react-router-dom';
import Guest from './pages/Guest';
import React from 'react';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies] = useCookies(['Authorization']);

  React.useEffect(() => {
    const token = cookies.Authorization;
    console.log(token);
    if (token) {
      // 토큰이 존재하면 로컬 스토리지에 저장
      localStorage.setItem('token', token);
    }
  }, [cookies.Authorization]);

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
