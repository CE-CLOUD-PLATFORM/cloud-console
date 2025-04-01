/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { useGetSubjectMembers } from '@/modules/subject/hook/use-get-members';
import ModalAddSubjectMember from '@/shared/components/modals/member/add-subject-member-modal';
import ModalConfirmDeleteMember from '@/shared/components/modals/member/delete-member';
import { TableMembers } from '@/shared/components/table/member-table';
import { useDialog } from '@/shared/hooks/use-dialog';
import type { Member } from '@/shared/types/job';
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
import React from 'react';

export default function GroupPage() {
  const { subject_id } = useParams();
  const modalAddSubjectMember = useDialog();
  const { data } = useGetSubjectMembers({
    subject_id: subject_id as string,
  });
  const deleteDialog = useDialog<Member>();
  const handleDelete = (item: Member) => {
    deleteDialog.handleOpen(item);
  };
  return (
    <>
      <ModalAddSubjectMember
        isOpen={modalAddSubjectMember.open}
        handleClose={modalAddSubjectMember.handleClose}
      />
      <ModalConfirmDeleteMember
        isOpen={deleteDialog.open}
        handleClose={deleteDialog.handleClose}
        data={deleteDialog.data }
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
                  <Typography variant="h5">Members</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    onClick={modalAddSubjectMember.handleOpen}
                    startIcon={
                      <SvgIcon>
                        <Plus />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
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
                <TableMembers onDelete={handleDelete} members={data?.members || []} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
