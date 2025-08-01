/* eslint-disable @typescript-eslint/no-use-before-define */
import { useUserStore } from '@/modules/auth/store/auth';
import { useCreateSshKey } from '@/modules/config/hook/use-create-public-key';
import type { PublicKeyReq } from '@/modules/config/types/public-key';
import type { FormProps } from '@/shared/interfaces/modal';
import { generateToastId, toastPatterns, toastPromise } from '@/shared/utils';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import ModalCover from '../index';
import '../index.css';

const form_id = 'public-key-create-form';
const ModalSSHKeyCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const queryClient = useQueryClient();

  const createSshKey = useCreateSshKey({
    onSuccess: () => {
      // Invalidate all user-public-key queries to ensure consistency across the app
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === 'user-public-key';
        },
      });
    },
    onError: (error) => {
      console.error('Create SSH key error:', error);
    },
  });

  // eslint-disable-next-line prefer-const
  let { user } = useUserStore();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PublicKeyReq>({
    values: { user_id: user?.info.id as string, key: '', name: '' },
  });

  const onSubmit: SubmitHandler<PublicKeyReq> = async (data) => {
    try {
      // Close modal first
      handleClose();

      // Generate unique toast ID
      const toastId = generateToastId('create', 'ssh-key', data.name);

      // Use toast promise pattern
      const createPromise = createSshKey.mutateAsync(data);

      await toastPromise(createPromise, toastPatterns.create('SSH Key'), {
        id: toastId,
      });

      // Reset form after successful creation
      reset();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box !min-h-[auto]" gap={3}>
        <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
          <Typography variant="h5">New SSH Key</Typography>
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
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Key Name"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                  />
                )}
              />
              <Controller
                name="key"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    label="Public key"
                    rows={6}
                    error={!!errors.key}
                    helperText={errors.key ? errors.key.message : ''}
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
      </Box>
    </ModalCover>
  );
};

export default ModalSSHKeyCreate;
