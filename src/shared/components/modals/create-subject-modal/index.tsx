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
import { useForm } from 'react-hook-form';
import { Subject } from '@/modules/subject/types/subject';
import { useUserStore } from '@/modules/auth/store/auth';
import { FormProps } from '@/shared/interfaces/modal';

const ModalSubjectCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { user } = useUserStore();
  const { register, handleSubmit, reset, setValue } = useForm<Subject>({
    defaultValues: {
      name: 'untitled',
      description: '',
      domain_id: user?.info.domain.id,
    },
  });
  useEffect(() => {
    if (user) {
      setValue('domain_id', user?.info.domain.id);
    }
  }, [user]);

  const onSubmit = async (data: Subject) => {
    console.log(data);
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
            <TextField
              {...register('name')}
              fullWidth
              label="Title"
              name="title"
            />
            <TextField
              {...register('description')}
              fullWidth
              label="Description"
              name="description"
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
            <Button sx={{ ml: 1 }} type="submit" variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalCover>
  );
};

export default ModalSubjectCreate;
