'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="space-y-5 text-center">
        <div>
          <h2 className="text-9xl font-bold">404</h2>
          <h2 className="text-xl font-semibold">
            Oops 😭,The page you are looking for is not available.
          </h2>
          <small className="text-slate-500">
            We are sorry for the inconvenience,The page you are <br /> trying to
            access has been removed or never been existed.
          </small>
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              router.replace('/');
            }}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
