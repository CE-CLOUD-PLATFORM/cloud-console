'use client';
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetInstances } from '@/modules/instance/hook/use-get-instances';
import { useGetInstanceOption } from '@/modules/instance/hook/use-get-options';
import { TableInstances } from '@/shared/components/table/instance-table';
import { useDialog } from '@/shared/hooks/use-dialog';
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import Plus from '@untitled-ui/icons-react/build/esm/Plus';
import FileDownload03 from '@untitled-ui/icons-react/build/esm/FileDownload03';
import { useParams } from 'next/navigation';
import React, { useCallback } from 'react';
import ModalCreateInstance from '@/shared/components/modals/instance/create-instance-modal';
import toast, { useToaster } from 'react-hot-toast';

export default function InstancesPage() {
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const modalCreateInstance = useDialog();
  const detailsDialog = useDialog();
  const { data: instancesData, isLoading } = useGetInstances({
    subject_id: subject_id as string,
  });
  const { data: instanceOption, isLoading: isInstanceOptionLoading } =
    useGetInstanceOption({
      subject_id: subject_id as string,
    });
  // const instancesData = useSubjectStore();

  const handleDelete = useCallback(
    (itemId: string): void => {
      detailsDialog.handleClose();
    },
    [detailsDialog, instancesData],
  );
  const handleDownloadVPN = async () => {
    try {
      const response = await fetch('/res/cloud.ovpn', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'ce-cloud-vpn.ovpn'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Download completed!');
    } catch (error) {
      toast.error('Download failed. Please try again.');
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      <ModalCreateInstance
        isOpen={modalCreateInstance.open}
        handleClose={modalCreateInstance.handleClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid size={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h5">Instances</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    onClick={handleDownloadVPN}
                    startIcon={
                      <SvgIcon>
                        <FileDownload03 />
                      </SvgIcon>
                    }
                    variant="outlined"
                  >
                    VPN
                  </Button>
                  <Button
                    onClick={modalCreateInstance.handleOpen}
                    startIcon={
                      <SvgIcon>
                        <Plus />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    New
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <TableInstances
                  data={instancesData?.instances || []}
                  flavors={instanceOption?.flavors || []}
                  images={instanceOption?.images || []}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
