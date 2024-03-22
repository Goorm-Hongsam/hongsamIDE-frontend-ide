import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { getCookie } from './utils/cookie.ts';
const queryClinent = new QueryClient();

const token = getCookie('Authorization');
if (token) {
  localStorage.setItem('Authorization', token);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClinent}>
    <RecoilRoot>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </RecoilRoot>
  </QueryClientProvider>,
);
