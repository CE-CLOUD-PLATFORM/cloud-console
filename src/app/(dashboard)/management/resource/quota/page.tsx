'use client';
import { useGetQuotas } from '@/modules/resource/hook/use-get-quota-list';
import type { Quota } from '@/modules/resource/types/quota';
import { QuotaDrawer } from '@/shared/components/item-drawer/quota-drawer';
import { TableQuota } from '@/shared/components/table/quota-table';
import { useDialog } from '@/shared/hooks/use-dialog';
import {
  Box,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';

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
  const { data: quotaData } = useGetQuotas();
  const detailsDialog = useDialog<handleQuotaDialogType>();
  const currentItem = useCurrentItem(
    quotaData?.quotas as Quota[],
    detailsDialog.data?.item?.id,
  );

  // const handleDelete = useCallback(
  //   (itemId: string): void => {
  //     detailsDialog.handleClose();
  //   },
  //   [detailsDialog],
  // );

  return (
    <>
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
                <Typography variant="h5">Quota</Typography>
                <Stack>
                  
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
                <TableQuota
                  onOpen={detailsDialog.handleOpen}
                  quotas={quotaData?.quotas as Quota[]}
                />
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
