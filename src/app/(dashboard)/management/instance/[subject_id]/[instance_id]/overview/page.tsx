'use client';
import { useGetInstance } from '@/modules/instance/hook/use-get-instance';
import { useGetInstanceVNC } from '@/modules/instance/hook/use-get-instance-vnc';
import CircleLoading from '@/shared/components/Loading/CircleLoading';
import { Box, Button, Stack, SvgIcon } from '@mui/material';
import AirStart from '@untitled-ui/icons-react/build/esm/Airplay';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const { instance_id, subject_id } = useParams();
  const { data: instanceData, isLoading: instanceDataLoading } = useGetInstance(
    {
      instance_id: instance_id as string,
      subject_id: subject_id as string,
    },
  );
  const {
    data: vncData,
    isLoading: isVncLoading,
    error: vncErr,
    refetch: refetchVNC,
  } = useGetInstanceVNC({
    instance_id: instance_id as string,
    subject_id: subject_id as string,
  });
  if (instanceDataLoading) {
    return (
      <Box className="flex h-full items-center justify-center">
        <CircleLoading />;
      </Box>
    );
  }
  return (
    <>
      <Stack className="h-full bg-red-200">
        <div>Card</div>
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          paddingX={15}
        >
          <Box>Instance: {instanceData?.instance.name}</Box>
          <Box>
            {' '}
            <Button
              onClick={() => {
                refetchVNC();
              }}
              startIcon={
                <SvgIcon>
                  <AirStart />
                </SvgIcon>
              }
              variant="contained"
            >
              VNC
            </Button>
          </Box>
          {vncData && <iframe src={vncData.url}></iframe>}
        </Stack>
      </Stack>
    </>
  );
}
