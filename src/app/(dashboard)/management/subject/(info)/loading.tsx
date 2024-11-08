import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
}
