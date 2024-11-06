// 'use client';

// import type { PropsWithChildren } from 'react';
// import { useCallback, useEffect } from 'react';
// import { useUserStore } from '../store/auth';
// import { setSession } from '@/shared/utils/';
// import { axiosInstance } from '@/shared/utils';
// import {getCookie} from "cookies-next"

// export function AuthProvider({ children }: PropsWithChildren) {
//   const { setUser, setLoading } = useUserStore(
//     (state) => state.actions,
//   );

//   const resetSession = useCallback(() => {
//     setUser(null);
//     setLoading(false);
//   }, [setUser, setLoading]);

//   const checkUserSession = useCallback(async () => {
//     const token = getCookie("token");
//     const user = getCookie("user")

//     if (
//       !token ||
//       !user 
//     ) {
//       resetSession()
//       return;
//     }

//     try {
//       axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//       const [user, credentials] = await Promise.all([
//         getUserProfile(),
//         refresh({ refreshToken }),
//       ]);

//       setUser(user);
//       setSession(credentials);
//     } catch (error) {
//       resetSession();
//     } finally {
//       setLoading(false);
//     }
//   }, [resetSession, setLoading, setUser, setCredentials]);

//   useEffect(() => {
//     checkUserSession();
//   }, [checkUserSession]);

//   return <>{children}</>;
// }
