import { create } from "zustand";
import { devtools } from "zustand/middleware";

type NavState = {
    title: string
    actions: {
        setTitle: (title: string) => void
        clearTitle: () => void
    };
};

export const useAppNavStore = create<NavState>()(
    devtools((set) => ({
        title: "",
        actions: {
            setTitle: (title) => {
                set({
                    title
                })
            },
            clearTitle: () => {
                set({
                    title: ""
                })
            },
        },
    }))
);
