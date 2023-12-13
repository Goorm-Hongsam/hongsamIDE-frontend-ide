import './styles/App.css';
import Main from './pages/Main';
import { Route, Routes } from 'react-router-dom';
import Guest from './pages/Guest';
import React from 'react';

function App() {
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
