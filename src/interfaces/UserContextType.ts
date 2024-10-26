import { UserInfo } from "./auth";


export interface User {
    token: string
    info: UserInfo;
}
export interface UserContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};