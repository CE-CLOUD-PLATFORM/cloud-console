import { validate } from "numeral";

const version = {
  V1: "/api/v1"
}

const ROOTS = {
  AUTH: `${version.V1}/auth`,
  SUBJECT: `${version.V1}/subject`,
  GROUP: `${version.V1}/group`,
  SERVER: `${version.V1}/server`,
  CONFIG: `${version.V1}/config`,
  FLAVOR: `${version.V1}/flavor`,
  DOMAIN: `${version.V1}/domain`,
  RESOURCE: `${version.V1}/resource`,
};

export const endpoints = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
    recoveryPass: `https://iam-api.cloud.ce.kmitl.ac.th/api/password/reset-password`,
    validate:`${ROOTS.AUTH}/validate`
  },
  subject: {
    getAll: `${ROOTS.SUBJECT}s`,
    get: `${ROOTS.SUBJECT}`,
    create: `${ROOTS.SUBJECT}`,
    listMember: `${ROOTS.SUBJECT}/members`
  },
  group: {
    getAll: `${ROOTS.SUBJECT}/groups`,
    get: `${ROOTS.SUBJECT}/group`,
    post: `${ROOTS.GROUP}`
  },
  instance: {
    post: `${ROOTS.SERVER}`,
    list: `${ROOTS.SERVER}s`,
    option: `${ROOTS.SERVER}/options`
  },
  config: {
    publicKey: `${ROOTS.CONFIG}/public-key`
  },
  flavor: {
    list: `${ROOTS.FLAVOR}s`
  },
  domain:{
    users:`${ROOTS.DOMAIN}/users`
  },
  resource:{
    quota:"quota",
    credit:"credit",
  }
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
