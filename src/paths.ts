

export const paths = {
  index: '/',
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
  resource:{
    index:"/management/resource",
    credit:"/management/resource/credit",
    quota:"/management/resource/quota"
  },
  setting: {
    index: "/setting",
    access:{
      index:"/setting/access",
      public_key:"/setting/access/keys"
    },

  },
}
