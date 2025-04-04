/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
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
import { ItemMenu } from './item-menu';
import Link from 'next/link';
import type { Group } from '@/modules/group/types/group';

interface ItemListRowProps {
  item: Group;
  onDelete?: (item: Group) => void;
}

export const ItemListRow: FC<ItemListRowProps> = (props) => {
  const { item, onDelete } = props;
  const popover = usePopover<HTMLButtonElement>();

  const handleDelete = useCallback((): void => {
    popover.handleClose();
    onDelete?.(item);
  }, [item, popover, onDelete]);

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
          {/* <Link href={`/management/group/${item.project_id}/${item.id}/overview`}>
           */}
          <Link
            href={`/management/group/${item.project_id}/${item.id}/instance`}
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <Box sx={{ cursor: 'pointer' }}>
                <ItemIcon />
              </Box>
              <div>
                <Typography
                  noWrap
                  sx={{ cursor: 'pointer' }}
                  variant="subtitle2"
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
          </Link>
        </TableCell>
        <TableCell>
          <Typography noWrap variant="subtitle2">
            Member
          </Typography>
          <Typography color="text.secondary" noWrap variant="body2">
            {item.member_count}
          </Typography>
        </TableCell>
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
