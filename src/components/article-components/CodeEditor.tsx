import React, { useEffect } from 'react';
import { EditorState, Transaction } from '@uiw/react-codemirror';

// import { javascript } from '@codemirror/lang-javascript';
// import { python } from '@codemirror/lang-python';

import { EditorView } from '@uiw/react-codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';
import { java } from '@codemirror/lang-java';

// import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// import { codeState, isDarkModeState, languageState } from '../../atoms/recoliAtoms';
import { basicSetup } from 'codemirror';
import yorkie, { OperationInfo, EditOpInfo } from 'yorkie-js-sdk';
import { YorkieDoc } from '../../utils/YorkieDoc';
// import { autocompletion } from '@codemirror/autocomplete';

export interface ReactCodeMirrorRef {
  editor?: HTMLDivElement | null;
  state?: EditorState;
  view?: EditorView;
}

const CodeEditor = () => {
  // const pyLang = [python()];
  // const jsLang = [javascript({ jsx: true })];
  const javaLang = [java()];
  const editorRef = React.useRef<HTMLDivElement>(null);
  // const [code, setCode] = useRecoilState(codeState);
  // const isDarkMode = useRecoilValue(isDarkModeState);
  // const setLanguage = useSetRecoilState(languageState);
  // const cmViewRef = React.useRef<EditorView | null>(null);

  // const onChange = React.useCallback((val: string) => {
  //   setCode(val);
  // }, []);

  // React.useEffect(() => {
  //   let cmView: EditorView;
  //   const initializeEditor = async () => {
  //     if (editorRef.current && cmViewRef.current) {
  //       const client = new yorkie.Client('https://api.yorkie.dev', {
  //         apiKey: 'cm00t20ksk16o3siiedg',
  //       });
  //       await client.activate();
  //       // 02-1. create a document then attach it into the client.
  //       const doc = new yorkie.Document<YorkieDoc>('');

  //       await client.attach(doc);
  //       doc.update((root) => {
  //         if (!root.content) {
  //           root.content = new yorkie.Text();
  //         }
  //       }, 'create content if not exists');
  //       // 02-2. subscribe document event.
  //       const syncText = () => {
  //         const text = doc.getRoot().content;
  //         cmView.dispatch({
  //           changes: { from: 0, to: cmView.state.doc.length, insert: text.toString() },
  //           annotations: [Transaction.remote.of(true)],
  //         });
  //       };
  //       doc.subscribe('$.content', (event) => {
  //         if (event.type === 'remote-change') {
  //           const { operations } = event.value;
  //           handleOperations(operations);
  //         }
  //       });

  //       await client.sync();
  //       // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)
  //       const updateListener = EditorView.updateListener.of((viewUpdate) => {
  //         if (viewUpdate.docChanged) {
  //           for (const tr of viewUpdate.transactions) {
  //             const events = ['select', 'input', 'delete', 'move', 'undo', 'redo'];
  //             if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
  //               continue;
  //             }
  //             if (tr.annotation(Transaction.remote)) {
  //               continue;
  //             }
  //             tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
  //               doc.update((root) => {
  //                 root.content.edit(fromA, toA, inserted.toJSON().join('\n'));
  //               }, `update content byA ${client.getID()}`);
  //             });
  //           }
  //         }
  //       });
  //       // 03-2. create codemirror instance

  //       const el = editorRef.current;

  //       cmView = new EditorView({
  //         doc: '',
  //         extensions: [basicSetup, javaLang, updateListener],
  //         parent: el,
  //       });
  //       cmView.dom.style.height = '100%';
  //       el.innerHTML = '';
  //       el.appendChild(cmView.dom);

  //       // 03-3. define event handler that apply remote changes to local
  //       const handleOperations = (operations: Array<OperationInfo>) => {
  //         operations.forEach((op) => {
  //           if (op.type === 'edit') {
  //             handleEditOp(op);
  //           }
  //         });
  //       };
  //       const handleEditOp = (op: EditOpInfo) => {
  //         const changes = [
  //           {
  //             from: Math.max(0, op.from),
  //             to: Math.max(0, op.to),
  //             insert: op.value!.content,
  //           },
  //         ];

  //         cmView.dispatch({
  //           changes,
  //           annotations: [Transaction.remote.of(true)],
  //         });
  //       };
  //       syncText();
  //     }
  //   };

  //   initializeEditor().then(() => {
  //     console.log(editorRef.current);
  //   });
  //   //shortcut: zoom in out
  // }, []);

  useEffect(() => {
    let view: EditorView;
    async function main() {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = new yorkie.Client('https://api.yorkie.dev', {
        apiKey: 'cm00t20ksk16o3siiedg',
      });
      await client.activate();

      //subscribe peer change event
      // client.subscribe((event) => {
      //   network.statusListener(networkStatusElem)(event);
      // });

      // 02-1. create a document then attach it into the client.
      const doc = new yorkie.Document<YorkieDoc>(
        `codemirror6-${new Date().toISOString().substring(0, 10).replace(/-/g, '')}`,
      );
      // doc.subscribe('presence', (event) => {
      //   if (event.type !== DocEventType.PresenceChanged) {
      //     displayPeers(peersElem, doc.getPresences(), client.getID()!);
      //   }
      // });
      await client.attach(doc);
      doc.update((root) => {
        if (!root.content) {
          root.content = new yorkie.Text();
        }
      }, 'create content if not exists');

      // 02-2. subscribe document event.
      const syncText = () => {
        const text = doc.getRoot().content;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: text.toString() },
          annotations: [Transaction.remote.of(true)],
        });
      };
      // doc.subscribe((event) => {
      //   if (event.type === 'snapshot') {
      //     // The text is replaced to snapshot and must be re-synced.
      //     syncText();
      //   }
      //   displayLog( doc);
      // });

      doc.subscribe('$.content', (event) => {
        if (event.type === 'remote-change') {
          const { operations } = event.value;
          handleOperations(operations);
        }
      });

      await client.sync();

      // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)
      const updateListener = EditorView.updateListener.of((viewUpdate) => {
        if (viewUpdate.docChanged) {
          for (const tr of viewUpdate.transactions) {
            const events = ['select', 'input', 'delete', 'move', 'undo', 'redo'];
            if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
              continue;
            }
            if (tr.annotation(Transaction.remote)) {
              continue;
            }
            tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
              doc.update((root) => {
                root.content.edit(fromA, toA, inserted.toJSON().join('\n'));
              }, `update content byA ${client.getID()}`);
            });
          }
        }
      });

      // 03-2. create codemirror instance

      view = new EditorView({
        doc: '',
        extensions: [basicSetup, javaLang, githubDark, updateListener],
        parent: editorRef.current || undefined,
      });
      view.dom.style.height = '100%';

      // 03-3. define event handler that apply remote changes to local
      function handleOperations(operations: Array<OperationInfo>) {
        operations.forEach((op) => {
          if (op.type === 'edit') {
            handleEditOp(op);
          }
        });
      }
      function handleEditOp(op: EditOpInfo) {
        const changes = [
          {
            from: Math.max(0, op.from),
            to: Math.max(0, op.to),
            insert: op.value!.content,
          },
        ];

        view.dispatch({
          changes,
          annotations: [Transaction.remote.of(true)],
        });
      }

      syncText();
    }

    main();
  }, []);

  // useEffect(() => {
  //   let doc;
  //   let view;

  //   async function initializeEditor() {
  //     const client = new yorkie.Client('https://api.yorkie.dev', {
  //       apiKey: 'cm00t20ksk16o3siiedg',
  //     });
  //     await client.activate();

  //     doc = new yorkie.Document<YorkieDoc>('');

  //     await client.attach(doc);
  //     doc.update((root) => {
  //       if (!root.content) {
  //         root.content = new yorkie.Text();
  //       }
  //     }, 'create content if not exists');

  //     doc.subscribe('$.content', (event) => {
  //       if (event.type === 'remote-change') {
  //         const { operations } = event.value;
  //         handleOperations(operations);
  //       }
  //     });

  //     await client.sync();

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
  //   }

  //   initializeEditor();

  //   return () => {
  //     // Clean up
  //     // You may want to detach the document and perform other cleanup steps
  //   };
  // }, []); // Only run this effect once when the component mounts

  return (
    // <CodeMirror
    //   height='100%'
    //   value={code}
    //   onChange={onChange}
    //   extensions={javaLang}
    //   theme={isDarkMode ? githubDark : githubLight}
    // />

    <div ref={editorRef} style={{ height: 'calc(100vh - 30px)' }}></div>
  );
};

export default CodeEditor;
