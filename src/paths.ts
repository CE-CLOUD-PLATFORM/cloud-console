
export const paths = {
  // index: '/',
  auth: {
    index: '/auth',
    signIn: {
      index: '/auth/signin'
    }
  },

  dashboard: {
    index: '/management/subject',

    401: '/401',
    404: '/404',
    500: '/500'
  },
  subject: {
    index: '/management/subject',
    info: {
      index: '/management/subject/:sid',
      instance: '/management/subject/:sid/instance',
      group: '/management/subject/:sid/group',
      member: '/management/subject/:sid/member',
    },

    401: '/401',
    404: '/404',
    500: '/500'
  },
  group: {
    index: '/management/group',
    instance: "/management/group/:sid/:gid/instance",
    member: "/management/group/:sid/:gid/member",
  },
  resource: {
    index: "/management/resource",
    credit: "/management/resource/credit",
    quota: "/management/resource/quota"
  },
  setting: {
    index: "/setting",
    access: {
      index: "/setting/access",
      public_key: "/setting/access/keys"
    },

  },
}
