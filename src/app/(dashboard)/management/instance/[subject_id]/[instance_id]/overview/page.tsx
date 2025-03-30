'use client';
import { useGetInstance } from '@/modules/instance/hook/use-get-instance';
import { useGetInstanceVNC } from '@/modules/instance/hook/use-get-instance-vnc';
import BtnVPNDownload from '@/shared/components/button/vpn-download';
import CircleLoading from '@/shared/components/Loading/CircleLoading';
import { Alert, Box, Button, Stack, SvgIcon } from '@mui/material';
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
  const { data: vncData, refetch: refetchVNC } = useGetInstanceVNC({
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
    <Stack className="h-full px-24">
      <div>Card</div>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Box>Instance: {instanceData?.instance.name}</Box>

        <Box display={"flex"} gap={2}>
          <BtnVPNDownload/>
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
      </Stack>
      <Alert className="mt-3" severity="info">
        You must connect to the VPN before accessing VNC.
      </Alert>
      {vncData && <iframe src={vncData.url}></iframe>}
    </Stack>
  );
}
