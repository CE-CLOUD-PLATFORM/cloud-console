import type { User } from '@/modules/auth/types/user';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
export const setSession = (user: User) => {
  try {
    const { token, info } = user;
    if (token && info) {
      setCookie('token', token);
      setCookie('user', info);
    } else {
      deleteCookie('token');
      deleteCookie('user');
    }
  } catch (err) {
    throw err;
  }
};

export const removeSession = () => {
  try {
    const user = getCookie('user');
    const token = getCookie('token');
    if (user) {
      deleteCookie('user');
    }
    if (token) {
      deleteCookie('token');
    }
  } catch (err) {
    throw err;
  }
};
