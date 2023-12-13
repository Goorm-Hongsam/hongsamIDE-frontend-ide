import { atom } from 'recoil';
import javaDefaultValue from '../utils/Editor/defaultCode';

export const codeState = atom({
  key: 'codeState',
  default: javaDefaultValue(),
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
  default: 'aa11dd',
});
export const questionIdState = atom({
  key: 'questionIdState',
  default: '1',
});
export const roomIdState = atom({
  key: 'roomIdState',
  default: '',
});
