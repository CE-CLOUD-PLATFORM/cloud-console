'use client';
import { useGetInstances } from '@/modules/instance/hook/use-get-instances';
import { useGetInstanceOption } from '@/modules/instance/hook/use-get-options';
import { TableInstances } from '@/shared/components/table/instance-table/instance-table';
import { useDialog } from '@/shared/hooks/use-dialog';
import {
  Alert,
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

export default function InstancesPage() {
  const { subject_id } = useParams();
  // const { user } = useUserStore();
  const modalCreateInstance = useDialog();
  const deleteDialog = useDialog<Instance>();
  const internalDialog = useDialog<Instance>();

  // const detailsDialog = useDialog();
  const {
    data: instancesData,
    isLoading,
    isFetching,
    isPending,
    isRefetching,
  } = useGetInstances({
    subject_id: subject_id as string,
  });
  console.log({ isLoading, isFetching, isPending, isRefetching });

  const { data: instanceOption } = useGetInstanceOption({
    subject_id: subject_id as string,
  });

  const handleOnDelete = (data: Instance) => {
    deleteDialog.handleOpen(data);
  };

  const handleInternal = (data: Instance) => {
    internalDialog.handleOpen(data);
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
              <Alert className="mt-3" severity="info">
                Only instances you have permission to access will be displayed,
                including only from this subject.
              </Alert>
            </Grid>
            <Grid size={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <TableInstances
                  onDelete={handleOnDelete}
                  data={instancesData?.instances || []}
                  flavors={instanceOption?.flavors || []}
                  images={instanceOption?.images || []}
                  isLoading={isLoading}
                  onInternal={handleInternal}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
