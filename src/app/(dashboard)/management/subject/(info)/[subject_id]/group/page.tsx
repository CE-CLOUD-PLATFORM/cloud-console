'use client';
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetGroups } from '@/modules/group/hook/use-get-groups';
import { useParams } from 'next/navigation';
import React from 'react';

export default function GroupPage() {
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const { data, isLoading: isSubjectsLoading } = useGetGroups({
    user_id: user?.info.id as string,
    subject_id: subject_id as string,
    domain_name: user?.info.domain.name as string,
  });
  return (
    <div className="min-h-screen w-full">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-semibold">Group</h1>
        </div>
        <hr className="border border-slate-400" />
      </div>
    </div>
  );
}
