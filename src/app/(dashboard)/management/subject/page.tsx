/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCallback, useState } from 'react';

import { useDialog } from '@/shared/hooks/use-dialog';
import { usePageView } from '@/shared/hooks/use-page-view';
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

import { useDeleteSubject } from '@/modules/subject/hook/use-delete-subject';
import {
  useItemsSearch,
  useItemsStore,
} from '@/modules/subject/store/use-subjects-store';
import { ItemList } from '@/shared/components/item-list/subject-list/item-list';
import { ItemSearch } from '@/shared/components/item-list/subject-list/item-search';
import ModalSubjectCreate from '@/shared/components/modals/subject/create-subject-modal';
import type { View } from '@/shared/types/view';
import { useQueryClient } from '@tanstack/react-query';
import Plus from '@untitled-ui/icons-react/build/esm/Plus';
import toast from 'react-hot-toast';
import CircleLoading from '@/shared/components/Loading/CircleLoading';

export default function Page() {
  const itemsSearch = useItemsSearch();
  const queryClient = useQueryClient();
  const itemsStore = useItemsStore(itemsSearch.state);
  const [view, setView] = useState<View>('grid');
  const modalCreateSubject = useDialog();
  const detailsDialog = useDialog<string>();
  // const currentItem = useCurrentItem(itemsStore.items, detailsDialog.data);
  const deleteSubject = useDeleteSubject({
    onSuccess: () => {
      toast.success('Project deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
    onError: (err) => {
      toast.error('Fail to delete Subject.');
    },
    onMutate: () => {
      toast.loading('Deleting...');
    },
  });
  usePageView();

  const handleDelete = useCallback(
    (itemId: string): void => {
      detailsDialog.handleClose();
      deleteSubject.mutate({ id: itemId });
      itemsStore.handleDelete(itemId);
    },
    [detailsDialog, itemsStore],
  );

  return (
    <>
      <ModalSubjectCreate
        isOpen={modalCreateSubject.open}
        handleClose={modalCreateSubject.handleClose}
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
                  <Typography variant="h4">Your Subjects</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    onClick={modalCreateSubject.handleOpen}
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
                  onFiltersChange={itemsSearch.handleFiltersChange}
                  onSortChange={itemsSearch.handleSortChange}
                  onViewChange={setView}
                  sortBy={itemsSearch.state.sortBy}
                  sortDir={itemsSearch.state.sortDir}
                  view={view}
                />
                {!itemsStore.itemFetched && <CircleLoading />}
                {itemsStore.itemFetched && itemsStore.itemsCount === 0 ? (
                  <Box display={'flex'} justifyContent={'center'}>
                    <Typography className="text-slate-500" variant="subtitle1">
                      No subjects found.
                    </Typography>
                  </Box>
                ) : (
                  <ItemList
                    isLoading={itemsStore.itemLoading}
                    count={itemsStore.itemsCount}
                    items={itemsStore.items}
                    onDelete={handleDelete}
                    onOpen={detailsDialog.handleOpen}
                    onPageChange={itemsSearch.handlePageChange}
                    onRowsPerPageChange={itemsSearch.handleRowsPerPageChange}
                    page={itemsSearch.state.page}
                    rowsPerPage={itemsSearch.state.rowsPerPage}
                    view={view}
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
