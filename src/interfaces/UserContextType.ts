import { SubjectList } from "./Subject";

export interface User {
    token: string
}
export interface UserContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    getUserSubjects: () => SubjectList;
};