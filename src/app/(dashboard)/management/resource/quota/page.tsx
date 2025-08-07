/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetQuotas } from '@/modules/resource/hook/use-get-quota-list';
import type { Quota } from '@/modules/resource/types/quota';
import { useGetDomainUsers } from '@/modules/user/hook/use-get-domain-users';
import { QuotaDrawer } from '@/shared/components/item-drawer/quota-drawer';
import CircleLoading from '@/shared/components/Loading/CircleLoading';
import ModalQuotaCreate from '@/shared/components/modals/subject/create-quota-modal';
import { TableQuota } from '@/shared/components/table/quota-table';
import { useDialog } from '@/shared/hooks/use-dialog';
import type { SortDir } from '@/shared/types/sort';
import { applyPagination } from '@/shared/utils/apply-pagination';
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { Plus } from '@untitled-ui/icons-react';
import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';

interface Filters {
  query?: string;
}

interface ItemsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useItemsSearch = () => {
  const [state, setState] = useState<ItemsSearchState>({
    filters: {
      query: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'created_at',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
      page: 0, // Reset to first page when filters change
    }));
  }, []);

  const handleSortChange = useCallback((sortDir: SortDir): void => {
    setState((prevState) => ({
      ...prevState,
      sortDir,
    }));
  }, []);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [],
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0, // Reset to first page when rows per page changes
      }));
    },
    [],
  );

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

// interface ItemsStoreState {
//   items: Quota[];
//   itemsCount: number;
// }

const useCurrentItem = (items: Quota[], itemId?: string): Quota | undefined => {
  return useMemo((): Quota | undefined => {
    if (!itemId) {
      return undefined;
    }

    return items.find((item) => item.id === itemId);
  }, [items, itemId]);
};

interface handleQuotaDialogType {
  item: Quota;
  edit: boolean;
}

export default function QuotaManagementPage() {
  // const { subject_id } = useParams();
  const { user } = useUserStore();
  const itemsSearch = useItemsSearch();
  const { data: quotaData, isFetched: quotaFetched } = useGetQuotas({
    user_id: user?.info.id as string,
    domain_id: user?.info.domain.id as string,
  });
  const { data: userData, isFetched: userFetched } = useGetDomainUsers({
    domain_id: user?.info.domain.id as string,
  });

  // Apply pagination and sorting to quota data
  const processedQuotas = useMemo(() => {
    if (!quotaData?.quotas || !userData?.users) return [];

    const quotasWithUserNames = quotaData.quotas.map((quota) => ({
      ...quota,
      request_user_id:
        userData.users.find((user) => user.id === quota.request_user_id)
          ?.name || '-',
    }));

    // Apply pagination
    return applyPagination(
      quotasWithUserNames,
      itemsSearch.state.page,
      itemsSearch.state.rowsPerPage,
    );
  }, [
    quotaData,
    userData,
    itemsSearch.state.page,
    itemsSearch.state.rowsPerPage,
  ]);

  const detailsDialog = useDialog<handleQuotaDialogType>();
  const currentItem = useCurrentItem(
    quotaData?.quotas as Quota[],
    detailsDialog.data?.item?.id,
  );
  const modalCreateSubject = useDialog();

  // const handleDelete = useCallback(
  //   (itemId: string): void => {
  //     detailsDialog.handleClose();
  //   },
  //   [detailsDialog],
  // );

  return (
    <>
      <ModalQuotaCreate
        isOpen={modalCreateSubject.open}
        handleClose={modalCreateSubject.handleClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          px: 6,
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
                <Typography variant="h5">Quota</Typography>
                <Stack>
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
            <Grid size={12}>{/* <ResourceCard /> */}</Grid>
            <Grid size={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                {!(quotaFetched && userFetched) && <CircleLoading />}
                {quotaFetched && userFetched && (
                  <TableQuota
                    onOpen={detailsDialog.handleOpen}
                    quotas={processedQuotas}
                    onPageChange={itemsSearch.handlePageChange}
                    onRowsPerPageChange={itemsSearch.handleRowsPerPageChange}
                    page={itemsSearch.state.page}
                    rowsPerPage={itemsSearch.state.rowsPerPage}
                    totalCount={quotaData?.quotas.length || 0}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <QuotaDrawer
        item={currentItem}
        onClose={detailsDialog.handleClose}
        open={detailsDialog.open}
      />
    </>
  );
}
