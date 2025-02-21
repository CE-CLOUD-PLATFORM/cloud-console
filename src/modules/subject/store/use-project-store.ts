
// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import { Instance, Subject } from "../types/subject";
// import { useGetSubject } from "../hook/use-get-subject";
// import { useParams, usePathname } from "next/navigation";
// import { useUserStore } from "@/modules/auth/store/auth";
// type ProjectState = {
//     subject: Subject,
//     instances: Instance[]
// };

// export const useSubjectStore = create<ProjectState>()(
//     devtools((set) => {
//         const {user} = useUserStore.getState()
//         const { subject_id } = useParams();
//         console.log(1);

//         const { data } = useGetSubject({ domain_name: user?.info.domain.name as string, subject_id: subject_id as string })
//         console.log(data);

//         return {
//             actions: {

//             },
//         }
//     })
// );
