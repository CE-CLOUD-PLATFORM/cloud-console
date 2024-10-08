"use client";
import { SubjectList } from "@/interfaces/subject";
import { User, UserContextType } from "@/interfaces/UserContextType";
import { createContext, ReactNode, useContext, useState } from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

export let useUserContext = () => useContext(UserContext);

let UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };
  const getUserSubjects = (): SubjectList => {
    return {
      subjects: [
        { id: "1", name: "Default" },
        { id: "2", name: "Project1" },
        { id: "3", name: "Project2" },
        { id: "4", name: "Project4" },
        { id: "5", name: "Project4" },
      ],
    };
  };
  const userStore = {
    user,
    login,
    logout,
    getUserSubjects,
  };
  return (
    <UserContext.Provider value={userStore}> {children} </UserContext.Provider>
  );
};
export default UserProvider;
