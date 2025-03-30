/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useGetSubject } from '@/modules/subject/hook/use-get-subject';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/modules/auth/store/auth';
import { useSubjectStore } from '@/modules/subject/store/use-subject-store';
import {
  Box,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useAppNavStore } from '@/modules/app/store/use-app-nav-store';

export default function OverviewPage() {
  const { group_id } = useParams();
  const { user } = useUserStore();
  const setSubjectData = useSubjectStore(
    (state) => state.actions.setSubjectData,
  );
  const setNavTitle = useAppNavStore(state => state.actions.setTitle)
  const { data, isLoading: isSubjectLoading } = useGetSubject({
    subject_id: group_id as string,
    domain_name: user?.info.domain.name as string,
    user_id: user?.info.id as string,
  });
  useEffect(() => {
    if (data && !isSubjectLoading) {
      setSubjectData(data);
      setNavTitle(data.subject.name)
    }
  }, [data, isSubjectLoading]);
  return (
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
  );
}
