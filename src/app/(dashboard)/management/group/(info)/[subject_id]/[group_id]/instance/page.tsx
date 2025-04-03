'use client';
import { useGetInstances } from '@/modules/instance/hook/use-get-instances';
import { useGetInstanceOption } from '@/modules/instance/hook/use-get-options';
import { TableInstances } from '@/shared/components/table/instance-table/instance-table';
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

import { useParams } from 'next/navigation';
import React from 'react';
import ModalCreateInstance from '@/shared/components/modals/instance/create-instance-modal';
import BtnVPNDownload from '@/shared/components/button/vpn-download';
import type { Instance } from '@/modules/instance/types/instance';
import ModalInstanceDelete from '@/shared/components/modals/instance/delete-instance-modal';
import ModalMakeInternal from '@/shared/components/modals/instance/make-internal-modal';
import { useQueryClient } from '@tanstack/react-query';
import { useExternalAccess } from '@/modules/instance/hook/use-external-access';
import toast from 'react-hot-toast';
import { useStartInstance } from '@/modules/instance/hook/use-start-instance';
import ModalInstanceReboot from '@/shared/components/modals/instance/reboot-instance-model';
import ModalInstanceStop from '@/shared/components/modals/instance/stop-instance-model';

export default function InstancesPage() {
  const { group_id } = useParams();
  // const { user } = useUserStore();
  const modalCreateInstance = useDialog();
  const deleteDialog = useDialog<Instance>();
  const internalDialog = useDialog<Instance>();
  const rebootDialog = useDialog<Instance>();
  const stopDialog = useDialog<Instance>();
  const queryClient = useQueryClient();
  const exposeExternalAccess = useExternalAccess({
    onSuccess: () => {
      toast.success('Expose Successfully');
      queryClient.invalidateQueries({ queryKey: ['instances'] });
    },
    onError: () => {
      toast.error('Fail to Expose Instance.');
    },
    onMutate: () => {
      toast.loading('Exposing Instance...');
    },
  });
  const startinstance = useStartInstance({
    onSuccess: () => {
      toast.success('Start instance Successfully');
      queryClient.invalidateQueries({ queryKey: ['instances'] });
    },
    onError: () => {
      toast.error('Fail to Start Instance.');
    },
    onMutate: () => {
      toast.loading('Starting Instance...');
    },
  });
  const { data: instancesData, isLoading } = useGetInstances({
    subject_id: group_id as string,
  });
  const { data: instanceOption } = useGetInstanceOption({
    subject_id: group_id as string,
  });

  const handleOnDelete = (data: Instance) => {
    deleteDialog.handleOpen(data);
  };

  const handleInternal = (data: Instance) => {
    internalDialog.handleOpen(data);
  };
  const handleStartInstance = (data: Instance) => {
    startinstance.mutate({
      instance_id: data.id,
      subject_id: group_id as string,
    });
  };
  const handleStopInstance = (data: Instance) => {
    stopDialog.handleOpen(data);
  };
  const handleRebootInstance = (data: Instance) => {
    rebootDialog.handleOpen(data);
  };

  const handleExpose = (data: Instance) => {
    try {
      const external_access = {
        instance_id: data.id,
        subject_id: data.tenant_id,
      };
      exposeExternalAccess.mutate(external_access);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ModalCreateInstance
        isOpen={modalCreateInstance.open}
        handleClose={modalCreateInstance.handleClose}
      />
      <ModalInstanceDelete
        handleClose={deleteDialog.handleClose}
        isOpen={deleteDialog.open}
        data={deleteDialog.data}
      />
      <ModalMakeInternal
        handleClose={internalDialog.handleClose}
        isOpen={internalDialog.open}
        data={internalDialog.data}
      />
      <ModalInstanceReboot
        handleClose={rebootDialog.handleClose}
        isOpen={rebootDialog.open}
        data={rebootDialog.data}
      />
      <ModalInstanceStop
        handleClose={stopDialog.handleClose}
        isOpen={stopDialog.open}
        data={stopDialog.data}
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
                  <BtnVPNDownload />
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
                  onExpose={handleExpose}
                  onDelete={handleOnDelete}
                  data={instancesData?.instances || []}
                  flavors={instanceOption?.flavors || []}
                  images={instanceOption?.images || []}
                  isLoading={isLoading}
                  onInternal={handleInternal}
                  onReboot={handleRebootInstance}
                  onStart={handleStartInstance}
                  onStop={handleStopInstance}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
