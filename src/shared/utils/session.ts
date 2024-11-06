import type { User } from "@/modules/auth/types/user";
import { setCookie, deleteCookie } from "cookies-next";
export const setSession = (user: User) => {
  try {
    const { token, info } = user;
    if (token && info) {
      setCookie("token", token);
      setCookie("user", info);
    } else {
      deleteCookie("token");
      deleteCookie("user");
    }
  } catch (err) {
    throw err;
  }
};
