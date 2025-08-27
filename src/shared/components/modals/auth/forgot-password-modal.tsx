/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import ModalCover from '../index';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import '../index.css';
import { Controller, useForm } from 'react-hook-form';
import type { FormProps } from '@/shared/interfaces/modal';
import { useRecoveryPassword } from '@/modules/auth/hook/use-recovery-pass';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/modules/auth/validations/recovery-pass';
import type { IRecoveryPassword } from '@/modules/auth/types/account';
import toast from 'react-hot-toast';
import Image from 'next/image';

const form_id = 'forgot-password-form';
const ModalRecoveryPasswordModal = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const [formState, setFormState] = useState(0);
  const recoveryPass = useRecoveryPassword({
    onSuccess: () => {
      setFormState(1);
      reset();
    },
    onMutate: () => {
      toast.loading('Sending Recovery Password link.');
    },
    onError: () => {
      toast.error(
        'Recovery password link could not be sent. Please try again later.',
      );
    },
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IRecoveryPassword>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: IRecoveryPassword) => {
    try {
      recoveryPass.mutate(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    } catch (error) {}
  };

  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box !min-h-[auto]" gap={3}>
        {formState === 0 && (
          <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
            <Typography variant="h5">Forgot Password</Typography>
            <Box
              component="form"
              id={form_id}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              className="flex-1 p-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={1}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Recovery Email"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  )}
                />
              </Stack>

              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  marginTop: 2,
                }}
              >
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  color="inherit"
                  onClick={() => {
                    reset();
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  type="submit"
                  variant="contained"
                  form={form_id}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {formState === 1 && (
          <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
            <Box
              component="form"
              id={form_id}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              className="flex-1 p-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography fontSize={20} variant="overline">
                Recovery email sent successfully.
              </Typography>
              <Image
                width={120}
                height={120}
                src="/assets/checked.png"
                alt="logo"
              />
              <Typography fontSize={16} variant="subtitle1">
                Please check your email.
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  marginTop: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    reset();
                    handleClose();
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ModalCover>
  );
};

export default ModalRecoveryPasswordModal;
