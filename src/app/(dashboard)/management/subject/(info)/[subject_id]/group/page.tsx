'use client';
import {
  useGroupsSearch,
  useGroupsStore,
} from '@/modules/group/store/use-groups-store';
import { ItemList } from '@/shared/components/item-list/group-list/item-list';
import { ItemSearch } from '@/shared/components/item-list/group-list/item-search';
import CircleLoading from '@/shared/components/Loading/CircleLoading';
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
  const modalGroupCreate = useDialog();
  const detailsDialog = useDialog();
  const searchState = useGroupsSearch();
  const data = useGroupsStore(subject_id as string, searchState.state);
  const handleDelete = useCallback(
    (itemId: string): void => {
      console.log(itemId);
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
                  <Typography variant="h5">Groups</Typography>
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
                <ItemSearch
                  onFiltersChange={searchState.handleFiltersChange}
                  onSortChange={searchState.handleSortChange}
                  sortBy={searchState.state.sortBy}
                  sortDir={searchState.state.sortDir}
                />
                {!data.itemFetched && <CircleLoading />}
                {data.itemFetched && data.itemsCount === 0 ? (
                  <Box display={'flex'} justifyContent={'center'}>
                    <Typography className="text-slate-500" variant="subtitle1">
                      No subjects found.
                    </Typography>
                  </Box>
                ) : (
                  <ItemList
                    count={data?.itemsCount}
                    items={data?.items}
                    onDelete={handleDelete}
                    onOpen={detailsDialog.handleOpen}
                    onPageChange={searchState.handlePageChange}
                    onRowsPerPageChange={searchState.handleRowsPerPageChange}
                    page={searchState.state.page}
                    rowsPerPage={searchState.state.rowsPerPage}
                    // view={view}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
