import CodeEditor from '../article-components/CodeEditor';
import LeftBar from '../article-components/LeftBar';
import Terminal from '../article-components/Terminal';
import IdeHeader from '../article-components/IdeHeader';
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
