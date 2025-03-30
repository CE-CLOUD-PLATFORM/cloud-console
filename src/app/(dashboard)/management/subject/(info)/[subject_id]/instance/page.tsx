'use client';
import { useGetInstances } from '@/modules/instance/hook/use-get-instances';
import { useGetInstanceOption } from '@/modules/instance/hook/use-get-options';
import { TableInstances } from '@/shared/components/table/instance-table';
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

export default function InstancesPage() {
  const { subject_id } = useParams();
  // const { user } = useUserStore();
  const modalCreateInstance = useDialog();
  // const detailsDialog = useDialog();
  const { data: instancesData, isLoading } = useGetInstances({
    subject_id: subject_id as string,
  });
  const { data: instanceOption } = useGetInstanceOption({
    subject_id: subject_id as string,
  });
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
              <Alert className="mt-3" severity="info">
                Only instances you have permission to access will be displayed,
                including those from both your subjects and groups.
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
