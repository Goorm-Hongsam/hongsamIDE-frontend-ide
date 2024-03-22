import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { getCookie } from './utils/cookie.ts';
const queryClinent = new QueryClient();

const token2 = getCookie('Authorization');
console.log('main.tsx token2 : ', token2);
if (token2) {
  localStorage.setItem('Authorization', token2);
}
console.log('main.tsx Authorization LocalStorage : ', localStorage.getItem('Authorization'));

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
