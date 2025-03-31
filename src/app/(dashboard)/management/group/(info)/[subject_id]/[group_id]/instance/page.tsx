'use client';
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

import { useParams } from 'next/navigation';
import React from 'react';
import ModalCreateInstance from '@/shared/components/modals/instance/create-instance-modal';
import BtnVPNDownload from '@/shared/components/button/vpn-download';
import type { Instance } from '@/modules/instance/types/instance';

export default function InstancesPage() {
  const { group_id } = useParams();
  // const { user } = useUserStore();
  const modalCreateInstance = useDialog();
  const deleteDialog = useDialog<Instance>();
  const { data: instancesData, isLoading } = useGetInstances({
    subject_id: group_id as string,
  });
  const { data: instanceOption } = useGetInstanceOption({
    subject_id: group_id as string,
  });

  const handleOnDelete = (data: Instance) => {
    deleteDialog.handleOpen(data);
  };
  // const instancesData = useSubjectStore();

  // const handleDelete = useCallback(
  //   (itemId: string): void => {
  //     detailsDialog.handleClose();
  //   },
  //   [detailsDialog, instancesData],
  // );
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
                  onDelete={handleOnDelete}
                  data={instancesData?.instances || []}
                  flavors={instanceOption?.flavors || []}
                  images={instanceOption?.images || []}
                  isLoading={isLoading}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
