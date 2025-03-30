/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, type FC } from 'react';
import { format } from 'date-fns';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import PieChart01 from '@untitled-ui/icons-react/build/esm/PieChart01';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import {
  backdropClasses,
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  Grid2 as Grid,
  Chip,
  Collapse,
  Button,
} from '@mui/material';
import ChevronUp from '@untitled-ui/icons-react/build/esm/ChevronUp';
import ChevronDown from '@untitled-ui/icons-react/build/esm/ChevronDown';
import type { Quota } from '@/modules/resource/types/quota';
import { useApprovalQuota } from '@/modules/resource/hook/use-approval-quota';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface QuotaDrawerProps {
  item?: Quota;
  onClose: () => void;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onTagsChange?: (itemId: string, value: string[]) => void;
  open?: boolean;
}

export const QuotaDrawer: FC<QuotaDrawerProps> = (props) => {
  const { item, onClose, onDelete, open = false } = props;
  const [expandedRow, setExpandedRow] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const approvalQuota = useApprovalQuota({
    onSuccess: () => {
      toast.success("Updated Quota Successfully.")
      queryClient.invalidateQueries({ queryKey: ['quotas'] });
    },
    onMutate: () => {
      onClose();
      toast.loading('Operating..');
    },
    onError: () => {
      toast.error('Fail to operate.');
    },
  });
  const handleToggle = () => {
    setExpandedRow((prev) => !prev);
  };
  let content: JSX.Element | null = null;
  const handleApproveBtnClick = () => {
    if (item?.id) {
      approvalQuota.mutate({
        quota_id: item.id,
        status: 'accepted',
      });
    } else {
      toast.error('Item not found.Try again.');
    }
  };
  const handleRejectBtnClick = () => {
    if (item?.id) {
      approvalQuota.mutate({
        quota_id: item.id,
        status: 'rejected',
      });
    } else {
      toast.error('Item not found.Try again.');
    }
  };
  if (item) {
    const createdAt =
      item.created_at && format(item.created_at, 'MMM dd, yyyy HH:mm');
    const updatedAt =
      item.updated_at && format(item.created_at, 'MMM dd, yyyy HH:mm');

    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ p: 3 }}
        >
          <IconButton onClick={onClose}>
            <SvgIcon fontSize="small">
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Divider />
        <Box
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.500' : 'neutral.300',
              borderRadius: 1,
              borderStyle: 'dashed',
              borderWidth: 1,
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              p: 3,
              gap: 1,
            }}
          >
            <PieChart01 /> <Typography variant="h6">Quota</Typography>
          </Box>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">{item.subject_name}</Typography>
            <IconButton>
              <SvgIcon fontSize="small">
                <Edit02Icon />
              </SvgIcon>
            </IconButton>
          </Stack>
          <Grid container spacing={2}>
            <Grid
              size={{
                sm: 4,
                xs: 12,
              }}
            >
              <Typography color="text.secondary" variant="caption">
                Request by
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            >
              {item.request_user_id}
            </Grid>
            <Grid
              size={{
                sm: 4,
                xs: 12,
              }}
            >
              <Typography color="text.secondary" variant="caption">
                Academic Year
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            >
              {item.subject_academic_year}
            </Grid>
            <Grid
              size={{
                sm: 4,
                xs: 12,
              }}
            >
              <Typography color="text.secondary" variant="caption">
                Resource
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            >
              <Stack display={'flex'} direction={'row'} spacing={1}>
                <Chip label={`CORES: ${item.req_resource.cores}`} />
                <Chip label={`INSTANCE: ${item.req_resource.max_instance}`} />
                <Chip
                  label={`RAM: ${(item.req_resource.memory as number) / 1024} GB`}
                />
              </Stack>
            </Grid>
            <Grid
              size={{
                sm: 4,
                xs: 12,
              }}
              spacing={5}
              gap={5}
            >
              <Typography color="text.secondary" variant="caption">
                Usage Details
              </Typography>
              <IconButton size="small" onClick={() => handleToggle()}>
                {expandedRow ? <ChevronUp /> : <ChevronDown />}
              </IconButton>
            </Grid>
            <Grid size={12}>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  maxWidth: '300px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: expandedRow ? 'none' : 'block',
                }}
              >
                {item.detail}
              </Typography>
              <Collapse in={expandedRow}>
                <Typography variant="body2">{item.detail}</Typography>
              </Collapse>
            </Grid>

            <Grid
              size={{
                sm: 4,
                xs: 12,
              }}
            >
              <Typography color="text.secondary" variant="caption">
                Created At
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            >
              <Typography variant="body2">{createdAt}</Typography>
            </Grid>
            <Grid
              size={{
                sm: 4,
                xs: 12,
              }}
            >
              <Typography color="text.secondary" variant="caption">
                Modified At
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            >
              <Typography variant="body2">{updatedAt}</Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            ></Grid>

            <Grid size={12}>
              <Typography color="text.secondary" variant="caption">
                Actions
              </Typography>
            </Grid>
            <Grid size={12}>
              <Stack display="flex" direction="column" gap={1}>
                <Button onClick={handleApproveBtnClick} variant="contained">
                  Approve
                </Button>
                <Button
                  onClick={handleRejectBtnClick}
                  variant="outlined"
                  color="error"
                >
                  Reject
                </Button>
                <Button variant="text" color="warning">
                  Request Revision
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }

  return (
    <Drawer
      anchor="right"
      ModalProps={{
        sx: {
          [`& .${backdropClasses.root}`]: {
            background: 'transparent !important',
          },
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 550,
        },
      }}
    >
      {content}
    </Drawer>
  );
};

// QuotaDrawer.propTypes = {
//   // @ts-ignore
//   item: PropTypes.object,
//   onClose: PropTypes.func,
//   onDelete: PropTypes.func,
//   onFavorite: PropTypes.func,
//   onTagsChange: PropTypes.func,
//   open: PropTypes.bool,
// };
