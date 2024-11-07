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
//   camera: {
//     list: `${ROOTS.CAMERA}/list`,
//     details: (cameraId: number) => `${ROOTS.CAMERA}/${cameraId}`,
//     create: ROOTS.CAMERA,
//     update: ROOTS.CAMERA,
//     activate: (cameraId: number) => `${ROOTS.CAMERA}/${cameraId}/active`,
//     deactivate: (cameraId: number) => `${ROOTS.CAMERA}/${cameraId}/inactive`,
//   },
//   group: {
//     list: ROOTS.GROUP,
//   },
// };
