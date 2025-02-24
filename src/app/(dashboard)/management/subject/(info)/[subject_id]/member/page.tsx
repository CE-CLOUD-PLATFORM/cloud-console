'use client';
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetGroups } from '@/modules/group/hook/use-get-groups';
import { useSubjectStore } from '@/modules/subject/store/use-subject-store';
import { ItemList } from '@/shared/components/group-list/item-list';
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

export default function GroupPage() {
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const modalGroupCreate = useDialog();
  const detailsDialog = useDialog();
  const { data, isLoading: isSubjectsLoading } = useGetGroups({
    user_id: user?.info.id as string,
    subject_id: subject_id as string,
    domain_name: user?.info.domain.name as string,
  });
  // const data = useSubjectStore();
  const handleDelete = useCallback(
    (itemId: string): void => {
      detailsDialog.handleClose();
    },
    [detailsDialog],
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
                  <Typography variant="h5">Members</Typography>
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
                {/* <ItemSearch
                onFiltersChange={itemsSearch.handleFiltersChange}
                onSortChange={itemsSearch.handleSortChange}
                onViewChange={setView}
                sortBy={itemsSearch.state.sortBy}
                sortDir={itemsSearch.state.sortDir}
                view={view}
              /> */}
                <ItemList
                  count={data?.groups?.length}
                  items={data?.groups}
                  onDelete={handleDelete}
                  onOpen={detailsDialog.handleOpen}
                  // onPageChange={}
                  // onRowsPerPageChange={}
                  page={5}
                  rowsPerPage={5}
                  // view={view}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
