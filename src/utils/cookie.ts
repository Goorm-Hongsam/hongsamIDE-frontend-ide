import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (name: string, value: string, options?: CookieOptions) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
