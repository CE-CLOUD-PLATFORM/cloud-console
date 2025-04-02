'use client';
// import { NewInstanceInputs } from "@/interfaces/Instance";
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetUserPublicKeys } from '@/modules/config/hook/use-get-user-public-key';
import { ItemList } from '@/shared/components/item-list/keys-list/item-list';
import ModalSSHKeyCreate from '@/shared/components/modals/key/create-ssh-key-modal';
import { useDialog } from '@/shared/hooks/use-dialog';
import {
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import Plus from '@untitled-ui/icons-react/build/esm/Plus';

const Page = () => {
  const { user } = useUserStore();
  const modalSSHKey = useDialog();
  const { data } = useGetUserPublicKeys({
    user_id: user?.info.id as string,
  });

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
        <ItemList count={data?.keys?.length || 0} items={data?.keys} />
      </Stack>
    </>
  );
};
export default Page;
