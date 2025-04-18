/* eslint-disable @typescript-eslint/no-use-before-define */

import type { FormProps } from '@/shared/interfaces/modal';
import { Avatar, Box, Button, Stack, SvgIcon, Typography } from '@mui/material';
import AlertTriangleIcon from '@untitled-ui/icons-react/build/esm/AlertTriangle';
import ModalCover from '../index';
import '../index.css';
interface ModalDeleteFormProps extends FormProps {
  formLabel: string;
  formId: string;
  data?: string;
  onSubmit: () => Promise<void>;
}
const ModalDelete = (props: ModalDeleteFormProps) => {
  const { isOpen, handleClose, data, formId, formLabel, onSubmit } = props;

  const handleCloseBtn = () => {
    handleClose();
  };
  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box !min-h-[auto]" gap={3}>
        <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
          <Stack
            display={'flex'}
            flexDirection={'row'}
            alignItems={''}
            gap={1}
          >
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
              component="form"
              id={formId}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              className="flex-1 p-1 gap-2"

            >
              <Typography variant="h5">Confirm Delete {formLabel}</Typography>
              <Stack
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                px={1}
                gap={1}
              >
                <Typography fontWeight={600} variant="body1">
                  {formLabel}:
                </Typography>
                <Typography fontWeight={400}>{data}</Typography>
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

export default ModalDelete;
