import React from 'react';
import './styles/App.css';
import Main from './pages/Main';
import { Route, Routes } from 'react-router-dom';
import Error from './pages/Error';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/:uuidParam/:questionIdParam' element={<Main />} />
        <Route path='/:uuidParam/:questionIdParam/error' element={<Error message='error!!' />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
