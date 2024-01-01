import React from 'react';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';

import { EditorView } from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import { java } from '@codemirror/lang-java';

import { useRecoilState, useRecoilValue } from 'recoil';
import { codeState, isDarkModeState } from '../../atoms/recoliAtoms';

export interface ReactCodeMirrorRef {
  editor?: HTMLDivElement | null;
  state?: EditorState;
  view?: EditorView;
}

const CodeEditor: React.FC = () => {
  // const pyLang = [python()];
  // const jsLang = [javascript()];
  const javaLang = [java()];

  const [code, setCode] = useRecoilState(codeState);
  const isDarkMode = useRecoilValue(isDarkModeState);

  const onChange = React.useCallback((val: string) => {
    setCode(val);
  }, []);

  // React.useEffect(() => {
  //   let view: EditorView;
  //   async function main() {
  //     // 01. create client with RPCAddr(envoy) then activate it.
  //     const client = new yorkie.Client('https://api.yorkie.dev', {
  //       apiKey: 'cm00t20ksk16o3siiedg',
  //     });
  //     await client.activate();

  //     // 02-1. create a document then attach it into the client.
  //     const doc = new yorkie.Document<YorkieDoc>(
  //       `codemirror6-${new Date().toISOString().substring(0, 10).replace(/-/g, '')}`,
  //     );
  //     await client.attach(doc);
  //     doc.update((root) => {
  //       if (!root.content) {
  //         root.content = new yorkie.Text();
  //       }
  //     }, 'create content if not exists');

  //     // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)
  //     const updateListener = EditorView.updateListener.of((viewUpdate) => {
  //       if (viewUpdate.docChanged) {
  //         for (const tr of viewUpdate.transactions) {
  //           const events = ['select', 'input', 'delete', 'move', 'undo', 'redo'];
  //           if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
  //             continue;
  //           }
  //           if (tr.annotation(Transaction.remote)) {
  //             continue;
  //           }
  //           tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
  //             doc.update((root) => {
  //               root.content.edit(fromA, toA, inserted.toJSON().join('\n'));
  //             }, `update content byA ${client.getID()}`);
  //           });
  //         }
  //       }
  //     });

  //     // 03-2. create codemirror instance
  //     const el = editorRef.current;

  //     view = new EditorView({
  //       doc: '',
  //       extensions: [basicSetup, jsLang, githubDark, updateListener],
  //       parent: editorRef.current || undefined,
  //     });

  //     if (el) {
  //       view.dom.style.height = '100%';
  //       el.innerHTML = '';
  //       el.appendChild(view.dom);
  //     }

  //     // 03-3. define event handler that apply remote changes to local
  //     function handleOperations(operations: Array<OperationInfo>) {
  //       operations.forEach((op) => {
  //         if (op.type === 'edit') {
  //           handleEditOp(op);
  //         }
  //       });
  //     }
  //     function handleEditOp(op: EditOpInfo) {
  //       const changes = [
  //         {
  //           from: Math.max(0, op.from),
  //           to: Math.max(0, op.to),
  //           insert: op.value!.content,
  //         },
  //       ];

  //       view.dispatch({
  //         changes,
  //         annotations: [Transaction.remote.of(true)],
  //       });
  //     }

  //     // 04. synchronize text after creating the editor
  //     const syncText = () => {
  //       const text = doc.getRoot().content;
  //       view.dispatch({
  //         changes: { from: 0, to: view.state.doc.length, insert: text.toString() },
  //         annotations: [Transaction.remote.of(true)],
  //       });
  //     };

  //     // 05. subscribe document event.
  //     doc.subscribe('$.content', (event) => {
  //       if (event.type === 'remote-change') {
  //         const { operations } = event.value;
  //         handleOperations(operations);
  //       }
  //     });

  //     // 06. sync document with the server
  //     await client.sync();

  //     // 07. synchronize text after syncing with the server
  //     syncText();
  //   }

  //   main().then(() => {
  //     console.log('에디터 생성');
  //   });
  // }, []);

  return (
    <CodeMirror
      height='100%'
      value={code}
      onChange={onChange}
      extensions={[javaLang]}
      theme={isDarkMode ? abcdef : githubLight}
    />

    // <div ref={editorRef} style={{ height: 'calc(100vh - 30px)' }}></div>
  );
};

export default CodeEditor;
