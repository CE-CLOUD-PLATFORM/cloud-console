/* eslint-disable @typescript-eslint/no-use-before-define */

import type { FormProps } from '@/shared/interfaces/modal';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import ModalCover from '../index';
import '../index.css';
import { Group } from '@/modules/group/types/group';
import { useDeleteGroup } from '@/modules/group/hook/use-delete-group';
interface ModalDeleteFormProps extends FormProps {
  data?: Group;
}
const formLabel = 'Group';
const form_id = `${formLabel}-delete-form`;
const ModalGroupDelete = (props: ModalDeleteFormProps) => {
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();
  const deleteFn = useDeleteGroup({
    onSuccess: () => {
      toast.success(`${formLabel} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: () => {
      toast.error(`Fail to delete ${formLabel}.`);
    },
    onMutate: () => {
      handleClose();
      toast.loading('Deleting...');
    },
  });

  const onSubmit = async () => {
    try {
      if (data?.id) {
        deleteFn.mutate(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseBtn = () => {
    handleClose();
  };
  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box !min-h-[auto]" gap={3}>
        <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
          <Typography variant="h5">Confirm Delete {formLabel}</Typography>
          <Box
            component="form"
            id={form_id}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            className="flex-1 p-1"
          >
            <Stack
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              px={3}
              gap={1}
            >
              <Typography fontWeight={600} variant="body1">
                {formLabel}:
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
              <Button variant="outlined" onClick={handleCloseBtn}>
                Cancel
              </Button>
              <Button
                sx={{ ml: 1 }}
                // type="submit"
                // form={form_id}
                variant="contained"
                color="error"
                onClick={onSubmit}
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

export default ModalGroupDelete;
