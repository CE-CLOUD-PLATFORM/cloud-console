'use client';
import { useGetSubject } from '@/modules/subject/hook/use-get-subject';
import React from 'react';
import { useParams } from 'next/navigation';
import { string } from 'yup';
import { useUserStore } from '@/modules/auth/store/auth';

interface PageProps {
  params: {
    subject_id: string;
  };
}
export default function OverviewPage() {
  let { subject_id } = useParams();
  let { user } = useUserStore();
  const { data, isLoading: isSubjectsLoading } = useGetSubject({
    subject_id: subject_id as string,
    domain_name: user?.info.domain.name as string,
  });
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
