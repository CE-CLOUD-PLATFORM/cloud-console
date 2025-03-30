'use client';
import { useGetSubjectMembers } from '@/modules/group/hook/use-get-members';
import ModalAddGroupMember from '@/shared/components/modals/member/add-group-member-modal';
import { TableMembers } from '@/shared/components/table/member-table';
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
import React from 'react';

export default function GroupPage() {
  const {  group_id } = useParams();
  const modalAddSubjectMember = useDialog();
  // const detailsDialog = useDialog();
  const { data } = useGetSubjectMembers({
    subject_id: group_id as string,
  });
  // const data = useSubjectStore();
  // const handleDelete = useCallback(
  //   (itemId: string): void => {
  //     detailsDialog.handleClose();
  //   },
  //   [detailsDialog],
  // );

  return (
    <>
      <ModalAddGroupMember
        isOpen={modalAddSubjectMember.open}
        handleClose={modalAddSubjectMember.handleClose}
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
                <TableMembers members={data?.members || []} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
