'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { UserInfo } from '@/modules/auth/types/user';
import { getCookie } from 'cookies-next';
import { useGetSubjects } from '@/modules/subject/hook/use-get-subjects';
import { useGetInstances } from '@/modules/instance/hook/use-get-instances';

export default function SubjectId() {
  const { subject_id } = useParams<{ subject_id: string }>();
  const s = useGetInstances({
    subject_id,
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
