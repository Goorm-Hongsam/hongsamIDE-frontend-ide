import { atom } from 'recoil';
import { TResult } from '../types/Code';

export const codeState = atom({
  key: 'codeState',
  default: '',
});
export const isDarkModeState = atom({
  key: 'isDarkModeState',
  default: false,
});
export const senderState = atom({
  key: 'senderState',
  default: '',
});
export const uuidState = atom({
  key: 'uuidState',
  default: '',
});
export const questionIdState = atom({
  key: 'questionIdState',
  default: '',
});
export const roomIdState = atom({
  key: 'roomIdState',
  default: '',
});
export const languageState = atom({
  key: 'languageState',
  default: '',
});
export const resultState = atom<string>({
  key: 'resultState',
  default: '',
});
export const resultObjState = atom<TResult>({
  key: 'resultObjState',
  default: {
    compileError: false,
    correctResult: [],
    errorMessage: null,
    originAnswer: [],
    printResult: [],
    timeResult: [],
  },
});
export const isResultLoadingState = atom({
  key: 'isResultLoadingState',
  default: true,
});
