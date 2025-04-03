/* eslint-disable @typescript-eslint/no-use-before-define */

import type { FormProps } from '@/shared/interfaces/modal';
import { Avatar, Box, Button, Stack, SvgIcon, Typography } from '@mui/material';
import AlertTriangleIcon from '@untitled-ui/icons-react/build/esm/AlertTriangle';
import ModalCover from '../index';
import '../index.css';
import { useQueryClient } from '@tanstack/react-query';
import { useStopInstance } from '@/modules/instance/hook/use-stop-instance';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import type { Instance } from '@/modules/instance/types/instance';
interface ModalFormProps extends FormProps {
  data?: Instance;
}

const ModalInstanceReboot = (props: ModalFormProps) => {
  const { isOpen, handleClose, data } = props;
  const { group_id, subject_id } = useParams();

  const handleCloseBtn = () => {
    handleClose();
  };
  const queryClient = useQueryClient();
  const mutateFn = useStopInstance({
    onSuccess: () => {
      toast.success(`Instance reboot successfully. Awaiting further results.`);
      queryClient.invalidateQueries({
        queryKey: ['instances'],
      });
    },
    onError: () => {
      toast.error(`Fail to reboot instance.`);
    },
    onMutate: () => {
      handleClose();
      toast.loading('Instance rebooting...');
    },
  });

  const onSubmit = async () => {
    try {
      if (data?.id) {
        mutateFn.mutate({
          subject_id: (group_id || subject_id) as string,
          instance_id: data.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box !min-h-[auto]" gap={3}>
        <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
          <Stack display={'flex'} flexDirection={'row'} alignItems={''} gap={1}>
            <Avatar
              sx={{
                backgroundColor: 'error.lightest',
                color: 'error.main',
              }}
            >
              <SvgIcon>
                <AlertTriangleIcon />
              </SvgIcon>
            </Avatar>{' '}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              className="flex-1 gap-2 p-1"
            >
              <Typography variant="h5">Confirm Stop</Typography>
              <Stack
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                px={1}
                gap={1}
              >
                <Typography fontWeight={600} variant="body1">
                  Instance:
                </Typography>
                <Typography fontWeight={400}>{data?.name}</Typography>
              </Stack>

              <Box
                sx={{
                  alignItems: '',
                  display: 'flex',
                  marginTop: 2,
                }}
              >
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={handleCloseBtn}>
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
          </Stack>
        </Box>
      </Box>
    </ModalCover>
  );
};

export default ModalInstanceReboot;
