'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { UserInfo } from '@/modules/auth/types/user';
import { getCookie } from 'cookies-next';
import { useGetSubjects } from '@/modules/subject/hook/use-get-subjects';
import Loading from '@/shared/components/Loading';

export default function SubjectId() {
  const { subject_id } = useParams<{ subject_id: string }>();
  console.log(subject_id);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const userCookie = getCookie('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    setIsUserLoading(false);
  }, []);

  const { data, isLoading: isSubjectsLoading } = useGetSubjects({
    user_id: user?.id as string,
  });

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-semibold">Instance</h1>
        </div>
        <hr className="border border-slate-400" />
      </div>
    </div>
  );
}
