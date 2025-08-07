import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { Group } from "@/modules/group/types/group";

type GroupState = {
    group: Group | null,
    actions: {
        setCurrentGroup: (data: Group) => void;
    };
};

export const useCurrentGroupStore = create<GroupState>()(
    devtools((set) => ({
        group: null,
        actions: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            setCurrentGroup: (data: Group) => {
                set({
                    group: data,
                });
            },
        },
    }))
);
