import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Globe01Icon from '@untitled-ui/icons-react/build/esm/Globe03';
import Star01Icon from '@untitled-ui/icons-react/build/esm/Star01';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  TableCell,
  tableCellClasses,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { usePopover } from '@/shared/hooks/use-popover';
import { bytesToSize } from '@/shared/utils/bytes-to-size';
import { ItemIcon } from './item-icon';
import { ItemMenu } from './item-menu';
import { Subject } from '@/modules/subject/types/subject';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ItemListRowProps {
  item: Subject;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onOpen?: (itemId: string) => void;
}

export const ItemListRow: FC<ItemListRowProps> = (props) => {
  const { item, onDelete, onFavorite, onOpen } = props;
  const popover = usePopover<HTMLButtonElement>();
  const pathname = usePathname();

  const handleDelete = useCallback((): void => {
    popover.handleClose();
    onDelete?.(item.id);
  }, [item, popover, onDelete]);

  let size = '1';

  const createdAt = '1213';

  return (
    <>
      <TableRow
        key={item.id}
        sx={{
          backgroundColor: 'white',
          borderRadius: 1.5,
          boxShadow: 0,
          transition: (theme) =>
            theme.transitions.create(['background-color', 'box-shadow'], {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 16,
          },
          [`& .${tableCellClasses.root}`]: {
            borderBottomWidth: 1,
            borderBottomColor: 'divider',
            borderBottomStyle: 'solid',
            borderTopWidth: 1,
            borderTopColor: 'divider',
            borderTopStyle: 'solid',
            '&:first-of-type': {
              borderTopLeftRadius: (theme) => theme.shape.borderRadius * 1.5,
              borderBottomLeftRadius: (theme) => theme.shape.borderRadius * 1.5,
              borderLeftWidth: 1,
              borderLeftColor: 'divider',
              borderLeftStyle: 'solid',
            },
            '&:last-of-type': {
              borderTopRightRadius: (theme) => theme.shape.borderRadius * 1.5,
              borderBottomRightRadius: (theme) =>
                theme.shape.borderRadius * 1.5,
              borderRightWidth: 1,
              borderRightColor: 'divider',
              borderRightStyle: 'solid',
            },
          },
        }}
      >
        <TableCell>
          <Link href={`${pathname}/${item.id}/overview`}>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Box onClick={() => onOpen?.(item.id)} sx={{ cursor: 'pointer' }}>
                <ItemIcon />
              </Box>
              <div>
                <Typography
                  noWrap
                  onClick={() => onOpen?.(item.id)}
                  sx={{ cursor: 'pointer' }}
                  variant="subtitle2"
                >
                  {item.name}
                </Typography>
                <Typography color="text.secondary" noWrap variant="body2">
                  {item.description}
                </Typography>
              </div>
            </Stack>
          </Link>
        </TableCell>
        {/* <TableCell>
          <Typography noWrap variant="subtitle2">
            Created at
          </Typography>
          <Typography color="text.secondary" noWrap variant="body2">
            {createdAt}
          </Typography>
        </TableCell> */}
        <TableCell>
          <Box sx={{ display: 'flex' }}></Box>
        </TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right">
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <SvgIcon fontSize="small">
              <DotsVerticalIcon />
            </SvgIcon>
          </IconButton>
        </TableCell>
      </TableRow>
      <ItemMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
      />
    </>
  );
};

ItemListRow.propTypes = {
  // @ts-ignore
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onOpen: PropTypes.func,
};
