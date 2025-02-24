'use client';
import { useGetSubject } from '@/modules/subject/hook/use-get-subject';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/modules/auth/store/auth';
import { useSubjectStore } from '@/modules/subject/store/use-subject-store';

export default function OverviewPage() {
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const setSubjectData = useSubjectStore(
    (state) => state.actions.setSubjectData,
  );
  const { data, isLoading: isSubjectLoading } = useGetSubject({
    subject_id: subject_id as string,
    domain_name: user?.info.domain.name as string,
    user_id: user?.info.id as string,
  });
  useEffect(() => {
    if (data && !isSubjectLoading) {
      setSubjectData(data);
    }
  }, [data, isSubjectLoading]);
  return (
    <div className="min-h-screen w-full">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-semibold">Overview</h1>
        </div>
        <hr className="border border-slate-400" />
      </div>
    </div>
  );
}
