/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useGetSubject } from '@/modules/subject/hook/use-get-subject';
import React from 'react';
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
import { SubjectDetails } from '@/shared/components/detail-list/subject-detail';
import CircleLoading from '@/shared/components/Loading/CircleLoading';
import type { Subject } from '@/modules/subject/types/subject';

export default function OverviewPage() {
  const { subject_id } = useParams();
  const { user } = useUserStore();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const setSubjectData = useSubjectStore(
    (state) => state.actions.setSubjectData,
  );
  const setNavTitle = useAppNavStore((state) => state.actions.setTitle);
  const { data, isFetched } = useGetSubject({
    subject_id: subject_id as string,
    domain_name: user?.info.domain.name as string,
    user_id: user?.info.id as string,
  });
  // useEffect(() => {
  //   if (data && !isSubjectLoading) {
  //     setSubjectData(data);
  //     setNavTitle(data.subject.name);
  //   }
  // }, [data, isSubjectLoading]);
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
            <Stack direction="column" spacing={4}>
              <Typography variant="h5">Overview</Typography>
              <Stack
                width={'100%'}
                alignItems="center"
                direction="row"
                spacing={2}
              >
                {!isFetched && (
                  <Stack className="flex h-full w-full items-center justify-center">
                    <CircleLoading />
                  </Stack>
                )}
                {isFetched && (
                  <SubjectDetails data={data?.subject as Subject} />
                )}
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
