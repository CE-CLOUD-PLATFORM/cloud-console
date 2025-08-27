/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useEffect } from 'react';
import ModalCover from '../index';

import { useUserStore } from '@/modules/auth/store/auth';
import { useGetUserPublicKeys } from '@/modules/config/hook/use-get-user-public-key';
import type { PublicKey } from '@/modules/config/types/public-key';
import { useCreateInstance } from '@/modules/instance/hook/use-create-instance';
import { useGetInstanceOption } from '@/modules/instance/hook/use-get-options';
import type { InstanceCreate } from '@/modules/instance/types/instance';
import type { FormProps } from '@/shared/interfaces/modal';
import { generateToastId, toastPatterns, toastPromise } from '@/shared/utils';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import '../index.css';
import toast from 'react-hot-toast';

const groupFormId = 'instance-create-form';
const ModalCreateInstance = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { subject_id, group_id } = useParams();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { data: instanceOptions } = useGetInstanceOption({
    subject_id: (group_id ? group_id : subject_id) as string,
  });

  const { data: keysData, refetch: refetchKeys } = useGetUserPublicKeys({
    user_id: user?.info.id as string,
  });

  // Refetch keys when modal opens to ensure fresh data
  useEffect(() => {
    if (isOpen) {
      refetchKeys();
    }
  }, [isOpen, refetchKeys]);

  // Refetch keys when window gains focus (user returns from key management)
  useEffect(() => {
    const handleFocus = () => {
      if (isOpen) {
        refetchKeys();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isOpen, refetchKeys]);
  const createInstance = useCreateInstance({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instances'] });
    },
    onError: (error) => {
      toast.error('Create instance error');
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<InstanceCreate>({
    defaultValues: {
      name: '',
      volume_size: 30,
      subject_id: (group_id ? group_id : subject_id) as string,
    },
  });

  const onSubmit = async (data: InstanceCreate) => {
    try {
      // Close modal first
      handleClose();

      // Generate unique toast ID
      const toastId = generateToastId('create', 'instance', data.name);

      // Use toast promise pattern
      const createPromise = createInstance.mutateAsync(data);

      await toastPromise(createPromise, toastPatterns.create('Instance'), {
        id: toastId,
      });

      // Reset form after successful creation
      reset();
    } catch (error) {}
  };

  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box" gap={5}>
        <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto px-1">
          <Typography variant="h5">New Instance</Typography>
          <Box
            component="form"
            id={groupFormId}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            className="flex-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={1}>
              <Typography variant="h6">Information</Typography>
              <TextField
                id="username"
                variant="filled"
                label="Name"
                {...register('name', { required: true })}
              />
              {errors.name && <span>This field is required</span>}
              <Typography variant="h6">Specification</Typography>
              <FormControl fullWidth>
                <InputLabel variant="filled" id="flavors-label">
                  Flavors
                </InputLabel>
                <Controller
                  name="flavor_id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      labelId="flavors-label"
                      id="flavors"
                      label="Flavors"
                      variant="filled"
                      {...field}
                    >
                      {instanceOptions?.flavors.map((flavor) => (
                        <MenuItem key={flavor.id} value={flavor.id}>
                          {flavor.name} ({flavor.vcpus} vCPUs, {flavor.ram}
                          MB RAM, {flavor.disk}GB Disk)
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.flavor_id && <span>This field is required</span>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel variant="filled" id="images-label">
                  Images
                </InputLabel>
                <Controller
                  name="image_id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      labelId="images-label"
                      id="images"
                      label="Images"
                      variant="filled"
                      {...field}
                      sx={{
                        '& .MuiSelect-select': {
                          display: 'flex',
                          gap: '10px',
                        },
                      }}
                    >
                      {instanceOptions?.images.map((image) => (
                        <MenuItem
                          key={image.id}
                          className="flex gap-x-2"
                          value={image.id}
                        >
                          <Image
                            width={24}
                            height={24}
                            src={image.Properties?.logo_url || '/assets/os.png'}
                            alt=""
                          />
                          {image.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.flavor_id && <span>This field is required</span>}
              </FormControl>
              <Typography variant="h6">Authentication & Access</Typography>
              <div className="flex w-full items-center gap-x-2">
                <div className="w-full">
                  <Controller
                    name="public_key"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        className="w-full"
                        id="tags-filled"
                        options={
                          (keysData?.keys?.filter(
                            (option) =>
                              !field.value
                                ?.map(
                                  (key) =>
                                    keysData?.keys.find((k) => k.key === key)
                                      ?.name || key,
                                )
                                .includes(option.name),
                          ) as PublicKey[]) || []
                        }
                        getOptionLabel={(option) => (option as PublicKey).name}
                        isOptionEqualToValue={(option, value) =>
                          typeof value === 'string'
                            ? option.key === value
                            : option.key === value.key
                        }
                        freeSolo
                        value={(field.value as string[])?.map(
                          (key) =>
                            keysData?.keys.find(
                              (option) => option.key === key,
                            ) || {
                              key,
                              name: key,
                            },
                        )}
                        onChange={(event, newValue) => {
                          field.onChange(
                            newValue.map((item) =>
                              typeof item === 'string' ? item : item.key,
                            ),
                          );
                        }}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="filled"
                              label={option.name}
                              {...getTagProps({ index })}
                              key={index}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            label="Public Key"
                          />
                        )}
                      />
                    )}
                  />
                  {errors.public_key && (
                    <span className="text-red-500">
                      {errors.public_key.message}
                    </span>
                  )}
                </div>

                <Button
                  className="text-nowrap rounded-md bg-gray-200 p-2"
                  href="/setting/access/keys"
                  component="a"
                  target="_blank"
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    // Refetch keys when user returns from key management
                    setTimeout(() => refetchKeys(), 1000);
                  }}
                >
                  Manage Key
                </Button>
              </div>
              <TextField
                id="username"
                variant="filled"
                label="Username"
                {...register('username', { required: true })}
              />
              {errors.username && <span>This field is required</span>}
              <TextField
                id="password"
                variant="filled"
                type="password"
                label="Password"
                {...register('password', { required: true })}
              />
              {errors.password && <span>This field is required</span>}
              {/* <Typography variant="h6">Network Accessibility</Typography> */}
              {/* <Controller
                name="external_access"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="External Access (Allow Public DNS Access)"
                  />
                )}
              /> */}
            </Stack>

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                marginTop: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <Button color="inherit" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button
                sx={{ ml: 1 }}
                type="submit"
                variant="contained"
                form={groupFormId}
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

export default ModalCreateInstance;
