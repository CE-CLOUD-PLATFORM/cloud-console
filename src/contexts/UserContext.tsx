"use client";
import { User, UserContextType } from "@/interfaces/userContextType";
import { createContext, ReactNode, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext<UserContextType | undefined>(undefined);

export let useUserContext = () => useContext(UserContext);

let UserProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState<User | null>(null);
  const login = (user: User) => {
    setUser(user);
    setCookie("token", user.token, { expires: new Date(Date.now() + 900000) });
    
  };
  const logout = () => {
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
