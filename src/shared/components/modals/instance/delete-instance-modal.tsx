/* eslint-disable @typescript-eslint/no-use-before-define */
import type { FormProps } from '@/shared/interfaces/modal';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ModalCover from '../index';
import '../index.css';
import type { Instance, InstanceDelete } from '@/modules/instance/types/instance';
import { useDeleteInstance } from '@/modules/instance/hook/use-delete-instance';
interface InstanceFormProps extends FormProps {
  data?: Instance;
}
const form_id = 'instance-delete-form';
const ModalConfirmDeleteinstance = (props: InstanceFormProps) => {
  const { subject_id } = useParams();
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();
  const deleteSubjectMember = useDeleteInstance({
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['instances', subject_id] });
      toast.success('Deleted instance successfully.');
    },
    onMutate: () => {
      handleClose();
      toast.loading('Deleting instance...');
    },
    onError: () => {
      toast.error('Fail to delete instance, try again.');
    },
  });
  // eslint-disable-next-line prefer-const
  const { handleSubmit, reset } = useForm<InstanceDelete>({
    values: {
      subject_id: subject_id as string,
      id: data?.id as string,
    },
  });
  const onSubmit: SubmitHandler<InstanceDelete> = async (data) => {
    try {
      if (data) {
        deleteSubjectMember.mutate(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box !min-h-[auto]" gap={3}>
        <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
          <Typography variant="h5">Confirm Delete Member</Typography>
          <Box
            component="form"
            id={form_id}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            className="flex-1 p-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              px={3}
              gap={1}
            >
              <Typography fontWeight={600} variant="body1">
                Instance:
              </Typography>
              <Typography fontWeight={400}>{data?.name}</Typography>
            </Stack>
            <Divider
              sx={{
                height: '2px',
                mt: 2,
              }}
            />
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

export default ModalConfirmDeleteinstance;
