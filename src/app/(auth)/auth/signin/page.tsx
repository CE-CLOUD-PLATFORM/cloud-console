/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { useAuth } from '@/modules/auth/hook';
import type { IAuthLogin } from '@/modules/auth/types/auth';
import type { User } from '@/modules/auth/types/user';
import { userLoginResolver } from '@/modules/auth/validations/user-login';
import ModalForgotPassword from '@/shared/components/modals/auth/forgot-password-modal';
import { useDialog } from '@/shared/hooks/use-dialog';
import { useRememberMe } from '@/shared/hooks/use-remember-me';
import {
  generateToastId,
  setSession,
  toastPatterns,
  toastPromise,
} from '@/shared/utils';
import {
  getLastDomain,
  isStorageAvailable,
  saveLastDomain,
} from '@/shared/utils/auth-storage';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: authtentication, isPending } = useAuth();
  const {
    rememberMe,
    setRememberMe,
    savedCredentials,
    saveCredentials,
    clearCredentials,
  } = useRememberMe();

  // const { data: domainsData,isFetched } = useGetDomainList();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IAuthLogin>({
    resolver: userLoginResolver,
    defaultValues: {
      domain: 'default', // Will be overridden by useEffect
    },
  });

  const forgotPassModal = useDialog();

  // Initialize form with saved preferences
  useEffect(() => {
    if (isStorageAvailable()) {
      const lastDomain = getLastDomain();
      setValue('domain', lastDomain);

      // Load saved credentials if remember me was enabled
      if (savedCredentials) {
        setValue('username', savedCredentials.username);
        setValue('domain', savedCredentials.domain);
      }
    }
  }, [setValue, savedCredentials]);

  // Watch form values to handle label shrinking
  const watchUsername = watch('username');
  const watchPassword = watch('password');
  const selectedDomain = watch('domain');

  useEffect(() => {
    if (selectedDomain && isStorageAvailable()) {
      saveLastDomain(selectedDomain);
    }
  }, [selectedDomain]);
  const onSubmit: SubmitHandler<IAuthLogin> = async (
    loginRequest: IAuthLogin,
  ) => {
    try {
      // Generate unique toast ID for login
      const toastId = generateToastId('read', 'login', loginRequest.username);

      const loginPromise = authtentication(loginRequest);

      await toastPromise(loginPromise, toastPatterns.login, { id: toastId });

      // Save credentials if login successful and remember me is checked
      saveCredentials(loginRequest, rememberMe);

      const { user, token } = await loginPromise;
      const userData: User = { info: user, token: token };
      setSession(userData);
      router.push('/management/subject');
    } catch (error) {
      
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
              id="login-form"
              noValidate
              className="w-full space-y-4 p-5"
              autoComplete="on"
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
                  placeholder="64xxxxxx"
                  helperText="Use only username, do not include @kmitl.ac.th"
                  className="w-full"
                  autoComplete="username"
                  InputLabelProps={{
                    shrink: !!watchUsername || undefined,
                  }}
                  {...register('username', { required: true })}
                />
              </Box>
              <Box width={'100%'} className="!mt-0">
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
                  autoComplete="current-password"
                  InputLabelProps={{
                    shrink: !!watchPassword || undefined,
                  }}
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
                    render={({ field }) => (
                      <Select
                        error={errors.domain ? true : false}
                        labelId="domains-label"
                        id="domains"
                        label="Domain"
                        variant="filled"
                        {...field}
                        value={field.value || 'default'}
                      >
                        <MenuItem value={'default'}>Default</MenuItem>
                        <MenuItem value={'CE'}>CE</MenuItem>
                        {/* {domainsData?.domains?.map((domain) => (
                          <MenuItem value={domain.id}>{domain.name}</MenuItem>
                        ))} */}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              {/* Remember Me Checkbox */}
              <Box width={'100%'} className="!mt-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setRememberMe(checked);
                        // Clear saved credentials if unchecked
                        if (!checked) {
                          clearCredentials();
                          setValue('username', '');
                          setValue('domain', getLastDomain());
                        }
                      }}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember me"
                  className="text-slate-700"
                />
              </Box>
              <div className="w-full">
                <Button
                  disabled={isPending}
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
