/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { Credit } from '@/modules/subject/types/credit';
import { CreditDrawer } from '@/shared/components/item-drawer/credit-drawer';
import ResourceCard from '@/shared/components/resource-card';
import { TableCredit } from '@/shared/components/table/credit-table';
import { useDialog } from '@/shared/hooks/use-dialog';
import {
  Box,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';

const mockData: any[] = [
  {
    id: '1',
    resource: {
      flavor_id: 'small',
      instance: 1,
      details:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      time: '1d',
    },
    status: 'Pending',
    request_user_id: 'test-student-1',
    created_at: new Date(),
    updated_at: new Date(),
    amount: 144,
    type: 'recieve',
    subject_id: '12321231',
  },
  {
    id: '2',
    resource: {
      flavor_id: 'small',
      instance: 1,
      details:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      time: '1d',
    },
    status: 'Pending',
    request_user_id: 'test-student-1',
    created_at: new Date(),
    updated_at: new Date(),
    amount: 144,
    type: 'recieve',
    subject_id: '12321231',
  },
];
const useCurrentItem = (
  items: Credit[],
  itemId?: string,
): Credit | undefined => {
  return useMemo((): Credit | undefined => {
    if (!itemId) {
      return undefined;
    }

    return items.find((item) => item.id === itemId);
  }, [items, itemId]);
};
export interface handleCreditDialogType {
  item: Credit;
  edit: boolean;
}

export default function CreditManagementPage() {
  // const { subject_id } = useParams();
  const detailsDialog = useDialog<handleCreditDialogType>();
  const currentItem = useCurrentItem(mockData, detailsDialog.data?.item?.id);
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
                <div>
                  <Typography variant="h5">Credit</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid size={12}>
              <ResourceCard />
            </Grid>
            <Grid size={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <TableCredit credits={mockData} onOpen={detailsDialog.handleOpen}/>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <CreditDrawer
        item={currentItem}
        open={detailsDialog.open}
        onClose={detailsDialog.handleClose}
      />
    </>
  );
}
