'use client';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import type { ILoginReq } from '@/shared/interfaces/login';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/modules/auth/hook';
import type { User } from '@/modules/auth/types/user';
import { setSession } from '@/shared/utils';
import toast from 'react-hot-toast';
import { userLoginResolver } from '@/modules/auth/validations/user-login';
import { useDialog } from '@/shared/hooks/use-dialog';

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: authtentication } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginReq>({
    resolver: userLoginResolver,
  });

  const onSubmit: SubmitHandler<ILoginReq> = async (
    loginRequest: ILoginReq,
  ) => {
    // const forgotPassModal = useDialog<boolean>()
    try {
      const loginPromise = authtentication(loginRequest);
      await toast.promise(loginPromise, {
        loading: 'Loading',
        success: 'Login Successfully',
        error: 'Login Failed',
      });
      const { user, token } = await loginPromise;
      const userData: User = { info: user, token: token };
      setSession(userData);
      router.push('/management/subject');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex min-h-screen min-w-full">
        <div className="hidden w-full flex-col items-center justify-center gap-4 bg-blue-500 p-3 text-2xl font-semibold md:flex md:w-2/3">
          <img src="/assets/ce-logo.png"></img>
          <h1 className="text-center text-lg text-white md:text-4xl">
            CE CLOUD PLATFORM
          </h1>
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-white p-5 text-2xl font-semibold md:w-1/3">
          <h1 className="text-center font-bold text-lg md:text-4xl">Login</h1>
          <hr />
          <Stack
            component="form"
            noValidate
            className="w-full space-y-4 p-5"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box width={'100%'}>
              {/* <InputLabel className="!text-[16px] !text-[black]">
                Username
              </InputLabel> */}
              <TextField
                error={errors.username ? true : false}
                id="username"
                variant="filled"
                label="username"
                className="w-full"
                {...register('username', { required: true })}
              />
            </Box>
            <Box width={'100%'}>
              {/* <InputLabel className="!text-[16px] !text-[black]">
                Password
              </InputLabel> */}
              <TextField
                error={errors.password ? true : false}
                id="password"
                variant="filled"
                label="password"
                type="password"
                className='w-full'
                {...register('password', { required: true })}
              />
            </Box>
            <Box width={'100%'}>
              {/* <InputLabel className="!text-[16px] !text-[black]">
              Domain
              </InputLabel> */}
              <FormControl fullWidth>
                <InputLabel variant="filled" id="domains-label">
                  Domain
                </InputLabel>
                <Controller
                  name="domain"
                  control={control}
                  defaultValue="Default"
                  render={({ field }) => (
                    <Select
                      error={errors.domain ? true : false}
                      labelId="domains-label"
                      id="domains"
                      label="Domain"
                      variant="filled"
                      {...field}
                    >
                      <MenuItem value={'Default'}>Default</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
            <div className="w-full">
              <Button
                className="w-full rounded-md bg-blue-600 p-3 text-sm text-white"
                type="submit"
                variant="contained"
              >
                Login
              </Button>
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'end'}
              >
                <Button>Forget Password?</Button>
              </Box>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}
