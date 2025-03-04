'use client';
import { useGetSubjectMembers } from '@/modules/subject/hook/use-get-members';
import modalAddSubjectMember from '@/shared/components/modals/group/create-group-modal';
import ModalAddSubjectMember from '@/shared/components/modals/member/add-subject-member-modal';
import ResourceCard from '@/shared/components/resource-card';
import { TableCredit } from '@/shared/components/table/credit-table';
import { TableMembers } from '@/shared/components/table/member-table';
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
import Plus from '@untitled-ui/icons-react/build/esm/Plus';
import { useParams } from 'next/navigation';
import React, { useCallback } from 'react';

export default function CreditManagementPage() {
  const { subject_id } = useParams();
  const modalAddSubjectMember = useDialog();
  const detailsDialog = useDialog();
  const { data, isLoading: isSubjectsLoading } = useGetSubjectMembers({
    subject_id: subject_id as string,
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
              <ResourceCard/>
            </Grid>
            <Grid size={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <TableCredit
                  quotas={[
                    {
                      id: '1',
                      detail:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                      status: 'Pending',
                      request_user_id: 'test-student-1',
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
                      request_user_id: 'test-student-2',
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
                  ]}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
