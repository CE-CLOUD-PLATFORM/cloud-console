import { sign } from "crypto";
import { access } from "fs";
import index from "./app/(dashboard)/management/group/(info)/[group_id]/page";

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
  setting: {
    index: "/setting",
    access:{
      index:"/setting/access",
      public_key:"/setting/access/keys"
    },

  },
}
