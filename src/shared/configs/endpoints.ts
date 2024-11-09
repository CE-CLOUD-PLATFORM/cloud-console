const ROOTS = {
  AUTH: '/auth',
  SUBJECT: '/subject',
};

export const endpoints = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
  },
  subject: {
    getAll: `${ROOTS.SUBJECT}s`,
    get: `${ROOTS.SUBJECT}`,
  },
  group: {
    getAll: `${ROOTS.SUBJECT}/groups`,
    get: `${ROOTS.SUBJECT}/group`,
  },
};

//from chat
// const ROOTS = {
//   AUTH: '/auth',
//   SUBJECT: '/subject',
//   SERVER: '/server',
//   CONFIG: '/config',
//   CAMERA: '/camera',
//   GROUP: '/subject/groups',
// };

// export const endpoints = {
//   auth: {
//     login: `${ROOTS.AUTH}/login`,
//     logout: `${ROOTS.AUTH}/logout`,
//   },
//   subject: {
//     get: (subject_id: string) => `${ROOTS.SUBJECT}/${subject_id}`,
//     create: ROOTS.SUBJECT,
//     getAll: `${ROOTS.SUBJECT}s`,
//   },
//   instance: {
//     base: ROOTS.SERVER,
//     options: `${ROOTS.SERVER}/options`,
//   },
//   setting: {
//     publicKey: `${ROOTS.CONFIG}/public-key`,
//   },
//   group: {
//     list: ROOTS.GROUP,
//   },
// };
