'use client';
import { Quota } from '@/modules/subject/types/quota';
import { QuotaDrawer } from '@/shared/components/item-drawer/quota-drawer';
import ResourceCard from '@/shared/components/resource-card';
import { TableQuota } from '@/shared/components/table/quota-table';
import { useDialog } from '@/shared/hooks/use-dialog';
import {
  Box,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

const mockData: Quota[] = [
  {
    id: '1',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    status: 'Pending',
    request_user_id: 'test-subject-admin',
    created_at: new Date(),
    subject_academic_year: '68',
    subject_description: '2',
    subject_domain_id: 'default',
    subject_name: 'demo-request-quota-1',
    subject_resource: {
      cores: 10,
      max_instance: 5,
      memory: 20480,
    },
    updated_at: new Date(),
  },
  {
    id: '2',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    status: 'Pending',
    request_user_id: 'test-subject-admin',
    created_at: new Date(),
    subject_academic_year: '68',
    subject_description: '2',
    subject_domain_id: 'default',
    subject_name: 'demo-request-quota-2',
    subject_resource: {
      cores: 10,
      max_instance: 5,
      memory: 20480,
    },
    updated_at: new Date(),
  },
];

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
  const { subject_id } = useParams();
  const detailsDialog = useDialog<handleQuotaDialogType>();
  const currentItem = useCurrentItem(mockData, detailsDialog.data?.item?.id);

  const handleDelete = useCallback(
    (itemId: string): void => {
      detailsDialog.handleClose();
    },
    [detailsDialog],
  );

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
                  <Typography variant="h5">Quota</Typography>
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
                <TableQuota
                  onOpen={detailsDialog.handleOpen}
                  quotas={mockData}
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
