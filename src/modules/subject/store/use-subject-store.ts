import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Instance, ISubjectRes, Subject } from "../types/subject";
import { Group } from "@/modules/group/types/group";

type ProjectState = {
    subject: Subject;
    instances: Instance[];
    groups: Group[];
    actions: {
        setSubjectData: (data:ISubjectRes) => void;
    };
};

export const useSubjectStore = create<ProjectState>()(
    devtools((set) => ({
        subject: undefined as any,
        instances: [],
        groups: [],
        actions: {
            setSubjectData: ({ subject, instances, groups }) => {
                set({
                    subject,
                    instances,
                    groups
                });
            },
        },
    }))
);
