
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
    validate: `${ROOTS.AUTH}/validate`
  },
  subject: {
    getAll: `${ROOTS.SUBJECT}s`,
    get: `${ROOTS.SUBJECT}`,
    create: `${ROOTS.SUBJECT}`,
    listMember: `${ROOTS.SUBJECT}/members`,
    addMembers: `${ROOTS.SUBJECT}/members`,
    deleteMembers: `${ROOTS.SUBJECT}/members`,
  },
  group: {
    getAll: `${ROOTS.SUBJECT}/groups`,
    get: `${ROOTS.SUBJECT}/group`,
    post: `${ROOTS.GROUP}`
  },
  instance: {
    index: `${ROOTS.SERVER}`,
    vnc: `${ROOTS.SERVER}/vnc`,
    list: `${ROOTS.SERVER}s`,
    option: `${ROOTS.SERVER}/options`
  },
  config: {
    publicKey: `${ROOTS.CONFIG}/public-key`
  },
  flavor: {
    list: `${ROOTS.FLAVOR}s`
  },
  domain: {
    users: `${ROOTS.DOMAIN}/users`,
    roles: `${ROOTS.DOMAIN}/roles`,
  },
  resource: {
    quota: `${ROOTS.RESOURCE}/quota`,
    quotaAll: `${ROOTS.RESOURCE}/quota/list`,
    credit: `${ROOTS.RESOURCE}/credit`,
  }
};

