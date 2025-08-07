'use client';
import { useUserStore } from '@/modules/auth/store/auth';
import { useDeletePublicKey } from '@/modules/config/hook/use-delete-public-key';
import { useGetUserPublicKeys } from '@/modules/config/hook/use-get-user-public-key';
import { ItemList } from '@/shared/components/item-list/keys-list/item-list';
import ModalSSHKeyCreate from '@/shared/components/modals/key/create-ssh-key-modal';
import { useDialog } from '@/shared/hooks/use-dialog';
import { generateToastId, toastPatterns, toastPromise } from '@/shared/utils';
import {
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import Plus from '@untitled-ui/icons-react/build/esm/Plus';

const Page = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const modalSSHKey = useDialog();
  const { data } = useGetUserPublicKeys({
    user_id: user?.info.id as string,
  });
  const deleteKey = useDeletePublicKey({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-public-key', user?.info.id as string],
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error('Delete SSH key error:', error);
    },
  });

  const handleDelete = async (keyId: string) => {
    try {
      // Generate unique toast ID
      const toastId = generateToastId('delete', 'ssh-key', keyId);

      // Use toast promise pattern
      const deletePromise = deleteKey.mutateAsync(keyId);

      await toastPromise(deletePromise, toastPatterns.delete('SSH Key'), {
        id: toastId,
      });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
  return (
    <>
      <ModalSSHKeyCreate
        isOpen={modalSSHKey.open}
        handleClose={modalSSHKey.handleClose}
      />
      <Stack className="h-full w-full px-24 py-16" spacing={1}>
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box display={'flex'} alignItems={'end'} gap={1}>
            <Typography variant="h5">SSH keys</Typography>{' '}
          </Box>

          <Box display={'flex'} gap={2}>
            <Button
              onClick={modalSSHKey.handleOpen}
              startIcon={
                <SvgIcon>
                  <Plus />
                </SvgIcon>
              }
              variant="contained"
            >
              New SSH keys
            </Button>
          </Box>
        </Stack>
        <Divider className="mt-3 h-[2px] bg-slate-400" variant="fullWidth" />
        <Typography>
          This is a list of SSH keys associated with your account. Remove any
          keys that you do not recognize.
        </Typography>
        <ItemList
          onDelete={handleDelete}
          count={data?.keys?.length || 0}
          items={data?.keys}
        />
      </Stack>
    </>
  );
};
export default Page;
