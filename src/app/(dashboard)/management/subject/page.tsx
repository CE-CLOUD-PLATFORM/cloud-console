'use client';

import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useGetSubjects } from '@/modules/subject/hook/use-get-subjects';
import type { UserInfo } from '@/modules/auth/types/user';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

export default function Page() {
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
    <div className="md:p-10">
      <div className="mx-auto min-h-screen max-w-6xl space-y-8 rounded-md bg-white p-10 md:min-h-52">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">Subject</h1>
          </div>
          <div>
            <Button variant="outlined">
              <AddBoxIcon />
              Create
            </Button>
          </div>
        </div>
        <hr className="border border-slate-300" />
        {isUserLoading || isSubjectsLoading ? (
          <div className="flex w-full items-center justify-center space-x-5 text-center">
            <div>
              <CircularProgress />
            </div>
            <div className="md:text-2xl">Loading</div>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3 md:gap-4">
            {data?.subjects.map((subject) => (
              <Link
                href={`/management/subject/${subject.id}/overview`}
                key={subject.id}
                className="subjects-box text-center"
              >
                {subject.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
