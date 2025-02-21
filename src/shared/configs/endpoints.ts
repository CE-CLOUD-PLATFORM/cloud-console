
const version ={
  V1:"/api/v1"
}

const ROOTS = {
  AUTH: `${version.V1}/auth`,
  SUBJECT: `${version.V1}/subject`,
  GROUP: `${version.V1}/group`,
  SERVER: `${version.V1}/server`,
};

export const endpoints = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
  },
  subject: {
    getAll: `${ROOTS.SUBJECT}s`,
    get: `${ROOTS.SUBJECT}`,
    create: `${ROOTS.SUBJECT}`,
  },
  group: {
    getAll: `${ROOTS.SUBJECT}/groups`,
    get: `${ROOTS.SUBJECT}/group`,
    post:`${ROOTS.GROUP}`
  },
  instance: {
    list: `${ROOTS.SERVER}s`,
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
