import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Star01Icon from '@untitled-ui/icons-react/build/esm/Star01';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
import Globe01Icon from '@untitled-ui/icons-react/build/esm/Globe03';
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { usePopover } from '@/shared/hooks/use-popover';
import { bytesToSize } from '@/shared/utils/bytes-to-size';
import { ItemIcon } from './item-icon';
import { ItemMenu } from './item-menu';
import { Subject } from '@/modules/subject/types/subject';

interface ItemListCardProps {
  item: Subject;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onOpen?: (itemId: string) => void;
}

export const ItemListCard: FC<ItemListCardProps> = (props) => {
  const { item, onDelete, onFavorite, onOpen } = props;
  const popover = usePopover<HTMLButtonElement>();

  const handleDelete = useCallback((): void => {
    popover.handleClose();
    onDelete?.(item.id);
  }, [item, popover, onDelete]);

  let size = '1';

  const createdAt = '123';

  return (
    <>
      <Card
        key={item.id}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 0,
          transition: (theme) =>
            theme.transitions.create(['background-color, box-shadow'], {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 16,
          },
        }}
        variant="outlined"
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          sx={{
            pt: 2,
            px: 2,
          }}
        >
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <SvgIcon fontSize="small">
              <DotsVerticalIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
            }}
          >
            <Box
              onClick={() => onOpen?.(item.id)}
              sx={{
                display: 'inline-flex',
                cursor: 'pointer',
              }}
            >
              <ItemIcon />
            </Box>
          </Box>
          <Typography
            onClick={() => onOpen?.(item.id)}
            sx={{ cursor: 'pointer' }}
            variant="subtitle2"
          >
            {item.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <div>
              <Typography color="text.secondary" variant="body2">
                {size}
              </Typography>
            </div>
          </Stack>
          <Typography color="text.secondary" variant="caption">
            Created at {createdAt}
          </Typography>
        </Box>
      </Card>
      <ItemMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
      />
    </>
  );
};

ItemListCard.propTypes = {
  // @ts-ignore
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onOpen: PropTypes.func,
};
