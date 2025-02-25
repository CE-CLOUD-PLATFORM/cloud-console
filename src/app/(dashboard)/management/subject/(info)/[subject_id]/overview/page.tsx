'use client';
import { useGetSubject } from '@/modules/subject/hook/use-get-subject';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/modules/auth/store/auth';
import { useSubjectStore } from '@/modules/subject/store/use-subject-store';
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

export default function OverviewPage() {
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const setSubjectData = useSubjectStore(
    (state) => state.actions.setSubjectData,
  );
  const { data, isLoading: isSubjectLoading } = useGetSubject({
    subject_id: subject_id as string,
    domain_name: user?.info.domain.name as string,
    user_id: user?.info.id as string,
  });
  useEffect(() => {
    if (data && !isSubjectLoading) {
      setSubjectData(data);
    }
  }, [data, isSubjectLoading]);
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
                  <Typography variant="h5">Overview</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={2}>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              ></Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
