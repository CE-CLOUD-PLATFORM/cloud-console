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
import { useMemo } from 'react';

const useCurrentItem = (items: Quota[], itemId?: string): Quota | undefined => {
  return useMemo((): Quota | undefined => {
    if (!itemId) {
      return undefined;
    }

    return items.find((item) => item.id === itemId);
  }, [items, itemId]);
};
export interface handleQuotaDialogType {
  item: Quota;
  edit: boolean;
}

export default function QuotaManagementPage() {
  // const { subject_id } = useParams();
  const { user } = useUserStore();
  const { data: quotaData, isFetched: quotaFetched } = useGetQuotas({
    user_id: user?.info.id as string,
  });
  const { data: userData, isFetched: userFetched } = useGetDomainUsers({
    domain_id: user?.info.domain.id as string,
  });
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
                    quotas={
                      quotaData?.quotas.map((quota) => {
                        quota.request_user_id =
                          userData?.users.find(
                            (user) => user.id === quota.request_user_id,
                          )?.name || quota.request_user_id;
                        return quota;
                      }) as Quota[]
                    }
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
