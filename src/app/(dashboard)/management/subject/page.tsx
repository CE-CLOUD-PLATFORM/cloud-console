'use client';
import { useCallback, useState } from 'react';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Grid2 as Grid,
} from '@mui/material';
import { useDialog } from '@/shared/hooks/use-dialog';
import { usePageView } from '@/shared/hooks/use-page-view';
import { useSettings } from '@/shared/hooks/use-settings';

import { ItemList } from '@/shared/components/subject-list/item-list';
import { ItemSearch } from '@/shared/components/subject-list/item-search';
import {
  useCurrentItem,
  useItemsSearch,
  useItemsStore,
} from '@/modules/subject/store/use-projects-store';
import { View } from '@/shared/types/view';
import ModalProjectCreate from '@/shared/components/modals/create-subject-modal';

export default function Page() {
  const itemsSearch = useItemsSearch();
  const itemsStore = useItemsStore(itemsSearch.state);
  const [view, setView] = useState<View>('grid');
  const uploadDialog = useDialog();
  const modalCreateProject = useDialog();
  const detailsDialog = useDialog<string>();
  const currentItem = useCurrentItem(itemsStore.items, detailsDialog.data);

  usePageView();

  const handleDelete = useCallback(
    (itemId: string): void => {
      detailsDialog.handleClose();
      itemsStore.handleDelete(itemId);
    },
    [detailsDialog, itemsStore],
  );

  return (
    <>
      <ModalProjectCreate 
      isOpen={modalCreateProject.open} 
      handleClose={modalCreateProject.handleClose}
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
                    onClick={modalCreateProject.handleOpen}
                    startIcon={
                      <SvgIcon>
                        <Upload01Icon />
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
                <ItemList
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
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
