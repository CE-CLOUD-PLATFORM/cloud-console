import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="flex w-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
}
