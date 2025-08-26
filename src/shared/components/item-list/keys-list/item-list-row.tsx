/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  TableCell,
  tableCellClasses,
  TableRow,
  Typography,
} from '@mui/material';
import { usePopover } from '@/shared/hooks/use-popover';
import { ItemIcon } from './item-icon';
import { usePathname } from 'next/navigation';
import type { PublicKey } from '@/modules/config/types/public-key';
import { Trash03 } from '@untitled-ui/icons-react';
import { getDateddMMYYYY } from '@/shared/utils/date-locale';

interface ItemListRowProps {
  item: PublicKey;
  onDelete?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
}

export const ItemListRow: FC<ItemListRowProps> = (props) => {
  const { item, onDelete, onOpen } = props;
  const popover = usePopover<HTMLButtonElement>();
  const pathname = usePathname();

  const handleDelete = useCallback((): void => {
    popover.handleClose();
    onDelete?.(item.id);
  }, [item, popover, onDelete]);

  return (
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
            borderBottomRightRadius: (theme) => theme.shape.borderRadius * 1.5,
            borderRightWidth: 1,
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
          },
        },
      }}
    >
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box onClick={() => onOpen?.(item.id)} sx={{ cursor: 'pointer' }}>
            <ItemIcon />
          </Box>
          <div>
            <Typography
              noWrap
              onClick={() => onOpen?.(item.id)}
              sx={{ cursor: 'pointer', fontSize: '18px' }}
              variant="body1"
            >
              {item.name}
            </Typography>
            <Typography
              color="text.secondary"
              noWrap
              variant="body2"
            ></Typography>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          Added on {getDateddMMYYYY(new Date(item.created_at).toString())}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={handleDelete}>
          <SvgIcon fontSize="small">
            <Trash03 />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

ItemListRow.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  // @ts-ignore
  onFavorite: PropTypes.func,
  onOpen: PropTypes.func,
};
