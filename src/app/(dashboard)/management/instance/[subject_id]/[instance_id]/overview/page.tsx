'use client';
import { useGetInstance } from '@/modules/instance/hook/use-get-instance';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const { instance_id, subject_id } = useParams();
  const instanceData = useGetInstance({
    instance_id: instance_id as string,
    subject_id: subject_id as string,
  });
  console.log(instanceData.data);

  return <div>sdfa</div>;
}
