"use client";
import { User, UserContextType } from "@/interfaces/UserContextType";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext<UserContextType | undefined>(undefined);

export let useUserContext = () => useContext(UserContext);

let UserProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);

  const [user, setUser] = useState<User | null>(null);
  const login = (user: User) => {
    setUser(user);
    setCookie("token", user.token, {
      path: "/",
      expires: new Date(Date.now() + 3600000),
    }); //ms
    setCookie("user", user.info, {
      path: "/",
      expires: new Date(Date.now() + 3600000),
    }); //ms
  };
  useEffect(() => {
    if (
      cookies.token !== "undefined" &&
      cookies.user !== "undefined" &&
      cookies.token &&
      cookies.user
    ) {
      // console.log(cookies.user);

      login({ token: cookies.token, info: cookies.user });
    }
  }, []);

  const logout = () => {
    removeCookie("token");
    removeCookie("user");
    setUser(null);
  };

  const userStore = {
    user,
    login,
    logout,
  };
  return (
    <UserContext.Provider value={userStore}> {children} </UserContext.Provider>
  );
};
export default UserProvider;
