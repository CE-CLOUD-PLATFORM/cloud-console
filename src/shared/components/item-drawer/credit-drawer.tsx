/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, type FC } from 'react';
import PropTypes from 'prop-types';
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
import type { Credit } from '@/modules/subject/types/credit';
import ChevronUp from '@untitled-ui/icons-react/build/esm/ChevronUp';
import ChevronDown from '@untitled-ui/icons-react/build/esm/ChevronDown';

interface CreditDrawerProps {
  item?: Credit;
  onClose?: () => void;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onTagsChange?: (itemId: string, value: string[]) => void;
  open?: boolean;
}

export const CreditDrawer: FC<CreditDrawerProps> = (props) => {
  const { item, onClose, onDelete, open = false } = props;
  const [expandedRow, setExpandedRow] = useState<boolean>(false);
  console.log(3, open);

  const handleToggle = () => {
    setExpandedRow((prev) => !prev);
  };
  let content: JSX.Element | null = null;

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
            <PieChart01 /> <Typography variant="h6">Credit</Typography>
          </Box>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <div></div>
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
                Credit
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            >
              {item.amount} 
            </Grid>
            <Grid
              size={{
                sm: 4,
                xs: 12,
              }}
            >
              <Typography color="text.secondary" variant="caption">
                Calculate for
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 8,
                xs: 12,
              }}
            >
              <Stack display={'flex'} gap={1} direction={'row'}>
                <Chip label={`Flavor: ${item.resource.flavor_id}`} />
                <Chip label={`Instance: ${item.resource.instance}`} />
                <Chip label={`Time Usage: ${item.resource.time_in_hour}`} />
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
                {item.resource.instance}
              </Typography>
              <Collapse in={expandedRow}>
                <Typography variant="body2">{item.resource.instance}</Typography>
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
                <Button variant="contained">Approve</Button>
                <Button variant="outlined" color="error">
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

CreditDrawer.propTypes = {
  // @ts-ignore
  item: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onTagsChange: PropTypes.func,
  open: PropTypes.bool,
};
