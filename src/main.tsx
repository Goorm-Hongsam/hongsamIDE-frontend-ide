import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import { worker } from './utils/mooks/worker.ts';
import { RecoilRoot } from 'recoil';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
