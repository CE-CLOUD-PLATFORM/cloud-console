'use client';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
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
import ModalForgotPassword from '@/shared/components/modals/auth/forgot-password-modal';
import { useDialog } from '@/shared/hooks/use-dialog';
import type { IAuthLogin } from '@/modules/auth/types/auth';
import Image from 'next/image';
export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: authtentication } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthLogin>({
    resolver: userLoginResolver,
  });
  const forgotPassModal = useDialog();
  // const { data: domainsData } = useGetDomainList();
  const onSubmit: SubmitHandler<IAuthLogin> = async (
    loginRequest: IAuthLogin,
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
    <>
      <div className="flex h-screen min-w-full overflow-y-scroll lg:bg-cover">
        <div
          id="signin-bg"
          className="hidden w-full flex-col items-center justify-center gap-4 bg-cover p-3 text-2xl font-semibold lg:w-2/3 min-[1028px]:flex"
        ></div>
        <div className="flex h-fit w-full flex-col items-center justify-center bg-transparent p-5 md:h-full md:min-w-[450px] min-[1028px]:w-1/3">
          <div className="flex w-full max-w-[550px] flex-col items-center rounded-lg bg-white p-5 py-28 text-2xl font-semibold">
            <Image
              width={150}
              height={150}
              alt="ce-logo"
              src="/assets/ce-logo.png"
            />
            <h1 className="text-center text-lg text-black md:text-3xl">
              CE CLOUD PLATFORM
            </h1>
            <Stack
              component="form"
              noValidate
              className="w-full space-y-4 p-5"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box width={'100%'}>
                <InputLabel className="!text-[16px] !text-[black]">
                  Username
                </InputLabel>
                <TextField
                  error={errors.username ? true : false}
                  id="username"
                  variant="filled"
                  label="Username"
                  className="w-full"
                  {...register('username', { required: true })}
                />
              </Box>
              <Box width={'100%'}>
                <InputLabel className="!text-[16px] !text-[black]">
                  Password
                </InputLabel>
                <TextField
                  error={errors.password ? true : false}
                  id="password"
                  variant="filled"
                  label="Password"
                  type="password"
                  className="w-full"
                  {...register('password', { required: true })}
                />
              </Box>
              <Box width={'100%'}>
                <InputLabel className="!text-[16px] !text-[black]">
                  Domain
                </InputLabel>
                <FormControl fullWidth>
                  <InputLabel variant="filled" id="domains-label">
                    Domain
                  </InputLabel>
                  <Controller
                    name="domain"
                    control={control}
                    // defaultValue="CE"
                    defaultValue="default"
                  
                    render={({ field }) => (
                      <Select
                        error={errors.domain ? true : false}
                        labelId="domains-label"
                        id="domains"
                        label="Domain"
                        variant="filled"
                        {...field}
                        value={field.value}
                      >
                        <MenuItem value={'default'}>Default</MenuItem>
                        {/* <MenuItem value={'CE'}>CE</MenuItem> */}
                        {/* {domainsData?.domains?.map((domain) => (
                          <MenuItem value={domain.id}>{domain.name}</MenuItem>
                        ))} */}
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
                  <Button onClick={forgotPassModal.handleOpen}>
                    Forget Password?
                  </Button>
                </Box>
              </div>
            </Stack>
          </div>
        </div>
      </div>
      <ModalForgotPassword
        isOpen={forgotPassModal.open}
        handleClose={forgotPassModal.handleClose}
      />
    </>
  );
}
