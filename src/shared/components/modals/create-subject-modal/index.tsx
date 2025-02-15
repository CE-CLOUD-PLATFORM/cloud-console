import React, { useEffect } from 'react';
import ModalCover from '..';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import '../index.css';
import { Controller, useForm } from 'react-hook-form';
import { Subject } from '@/modules/subject/types/subject';
import { useUserStore } from '@/modules/auth/store/auth';
import { FormProps } from '@/shared/interfaces/modal';
import { useCreateSubject } from '@/modules/subject/hook/use-create-subjects';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const ModalSubjectCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const createProject = useCreateSubject({
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      reset();
      handleClose();
    },
    onError: () => {
      toast.error('Fail to create Subject.');
    },
    onMutate: () => {
      toast.loading('Creating...');
    },
  });
  const { register, handleSubmit, reset, setValue, control } = useForm<Subject>(
    {
      defaultValues: {
        name: 'untitled',
        description: '',
        domain_id: user?.info.domain.id,
      },
    },
  );
  useEffect(() => {
    if (user) {
      setValue('domain_id', user?.info.domain.id);
    }
  }, [user]);

  const onSubmit = async (data: Subject) => {
    try {
      createProject.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalCover isOpen={isOpen}>
      <Box className="modal-box" gap={5}>
        <Typography variant="h5">New Subject</Typography>
        <Box
          component="form"
          id="subject-create-form"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          className="flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
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
          </Stack>

          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
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
              form="subject-create-form"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalCover>
  );
};

export default ModalSubjectCreate;
