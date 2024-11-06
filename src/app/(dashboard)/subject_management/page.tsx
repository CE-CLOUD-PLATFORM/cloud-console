'use client';
import { getCookie } from 'cookies-next';
import { useGetSubjects } from '@/modules/subject/hook/use-get-subjects';
import { UserInfo } from '@/modules/auth/types/user';

export default function SubjectManagementPage() {
  const userCookie = getCookie('user');
  const user: UserInfo = userCookie != undefined && JSON.parse(userCookie);
  const { data, isLoading } = useGetSubjects({ user_id: user.id });
  if (!isLoading) {
    console.log(data);
  }
  return <div></div>;
}
