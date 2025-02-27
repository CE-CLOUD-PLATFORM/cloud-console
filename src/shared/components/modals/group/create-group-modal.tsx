import React, { useEffect } from 'react';
import ModalCover from '../index';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import '../index.css';
import { Controller, useForm } from 'react-hook-form';
import { Subject } from '@/modules/subject/types/subject';
import { useUserStore } from '@/modules/auth/store/auth';
import { FormProps } from '@/shared/interfaces/modal';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateGroup } from '@/modules/group/hook/use-create-group';
import { IGroupCreate } from '@/modules/group/types/group';
import { useParams } from 'next/navigation';

const groupFormId = 'group-create-form';
const ModalGroupCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const createGroup = useCreateGroup({
    onSuccess: () => {
      toast.success('Group created successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects', 'groups'] });
      reset();
      handleClose();
    },
    onError: () => {
      toast.error('Fail to create Group.');
    },
    onMutate: () => {
      toast.loading('Creating...');
    },
  });
  const { register, handleSubmit, reset, setValue, control } =
    useForm<IGroupCreate>({
      defaultValues: {
        name: 'untitled',
        description: '',
        domain_id: user?.info.domain.id,
        admin_id: user?.info.id,
        project_id: subject_id as string,
      },
    });

  const onSubmit = async (data: IGroupCreate) => {
    try {
      setValue('domain_id', user?.info.domain.id as string);
      setValue('admin_id', user?.info.id as string);

      createGroup.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalCover isOpen={isOpen}>
      <Box className="modal-box" gap={5}>
        <Typography variant="h5">New Group</Typography>
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
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Title" />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Description" />
              )}
            />

            <InputLabel
              sx={{
                '&': {
                  transform: 'translate(12px, 32px) scale(1) !important',
                },
              }}
              variant="filled"
              id="users-label"
            >
              User Admin
            </InputLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  labelId="users-label"
                  id="user_id"
                  label="User Admin"
                  variant="filled"
                  {...field}
                  value='admin-ce'
                >
                 <MenuItem  >admin-ce</MenuItem>
                </Select>
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
    </ModalCover>
  );
};

export default ModalGroupCreate;
