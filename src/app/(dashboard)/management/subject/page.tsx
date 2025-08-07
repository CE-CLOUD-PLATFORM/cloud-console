/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCallback, useState } from 'react';

import { useDialog } from '@/shared/hooks/use-dialog';
import { usePageView } from '@/shared/hooks/use-page-view';
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

import {
  useItemsSearch,
  useItemsStore,
} from '@/modules/subject/store/use-subjects-store';
import { ItemList } from '@/shared/components/item-list/subject-list/item-list';
import { ItemSearch } from '@/shared/components/item-list/subject-list/item-search';
import CircleLoading from '@/shared/components/Loading/CircleLoading';
import ModalSubjectCreate from '@/shared/components/modals/subject/create-subject-modal';
import type { View } from '@/shared/types/view';
import Plus from '@untitled-ui/icons-react/build/esm/Plus';
import ModalSubjectDelete from '@/shared/components/modals/subject/delete-subject-modal';
import type { Subject } from '@/modules/subject/types/subject';

export default function Page() {
  const itemsSearch = useItemsSearch();
  const itemsStore = useItemsStore(itemsSearch.state);
  const [view, setView] = useState<View>('grid');
  const modalCreateSubject = useDialog();
  const deleteDialog = useDialog<Subject>();
  // const currentItem = useCurrentItem(itemsStore.items, deleteDialog.data);

  usePageView();

  const handleDelete = useCallback(
    (item: Subject): void => {
      deleteDialog.handleOpen(item);
    },
    [deleteDialog, itemsStore],
  );

  return (
    <>
      <ModalSubjectCreate
        isOpen={modalCreateSubject.open}
        handleClose={modalCreateSubject.handleClose}
      />
      <ModalSubjectDelete
        isOpen={deleteDialog.open}
        data={deleteDialog.data}
        handleClose={deleteDialog.handleClose}
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
            spacing={2}
          >
            <Grid size={12} >
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                alignItems={'end'}
              >
                <div>
                  <Typography variant="h4">Subjects</Typography>
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
                    Resource
                  </Button>
                </Stack>
              </Stack>
              <Alert severity="info" className="mt-2">
                Request resources to access and use subjects.
              </Alert>
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
                    onOpen={deleteDialog.handleOpen}
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
