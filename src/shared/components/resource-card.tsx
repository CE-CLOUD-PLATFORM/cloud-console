import {
  Card,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

const ResourceCard = () => {
  return (
    <Card className="h-[180px] p-10 flex flex-col justify-between">
      <Stack
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={2}
      >
        <Typography minWidth={100} variant="h6">VCPUs</Typography>
        <LinearProgress
          className="flex-1"
          value={(4 * 100) / 192}
          variant="determinate"
        />
        <Typography>{`${((4 * 100) / 192).toFixed(2)}% (4 of 192)`}</Typography>
      </Stack>
      <Stack
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={2}
      >
        <Typography minWidth={100}  variant="h6">RAM</Typography>
        <LinearProgress
          className="flex-1"
          value={(4 * 100) / 732}
          variant="determinate"
        />
        <Typography>{`${((4 * 100) / 732).toFixed(2)}% (4 of 732)`}</Typography>
      </Stack>
      <Stack
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={2}
      >
        <Typography minWidth={100}  variant="h6">Instances</Typography>
        <LinearProgress
          className="flex-1"
          value={(1 * 100) / 250}
          variant="determinate"
        />
        <Typography>{`${((1 * 100) / 250).toFixed(2)}% (1 of 250)`}</Typography>
      </Stack>
    </Card>
  );
};

export default ResourceCard;
