import CodeEditor from '../components/article-components/CodeEditor';
import LeftBar from '../components/article-components/LeftBar';
import Terminal from '../components/article-components/Terminal';
import IdeHeader from '../components/article-components/IdeHeader';
const Main = () => {
  return (
    <div className='flex w-screen h-screen'>
      <IdeHeader />
      <LeftBar />
      <CodeEditor />
      <Terminal />
    </div>
  );
};
export default Main;
