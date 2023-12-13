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
