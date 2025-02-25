'use client';
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetGroups } from '@/modules/group/hook/use-get-groups';
import { useGetInstances } from '@/modules/instance/hook/use-get-instances';
import { useGetInstanceOption } from '@/modules/instance/hook/use-get-options';
import { TableInstances } from '@/shared/components/table/instance-table';
import ModalGroupCreate from '@/shared/components/modals/group/create-group-modal';
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
import React, { useCallback } from 'react';

export default function InstancesPage() {
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const modalGroupCreate = useDialog();
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

  return (
    <>
      <ModalGroupCreate
        isOpen={modalGroupCreate.open}
        handleClose={modalGroupCreate.handleClose}
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
                    onClick={modalGroupCreate.handleOpen}
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
