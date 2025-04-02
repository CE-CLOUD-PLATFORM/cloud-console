import { Menu, MenuItem, menuItemClasses, SvgIcon } from '@mui/material';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import PropTypes from 'prop-types';
import type { FC } from 'react';

interface ItemMenuProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  onDelete?: () => void;
  open?: boolean;
}

export const ItemMenu: FC<ItemMenuProps> = (props) => {
  const { anchorEl, onClose, onDelete, open = false } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      sx={{
        [`& .${menuItemClasses.root}`]: {
          fontSize: 14,
          '& svg': {
            mr: 1
          }
        }
      }}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
    >
      {/* <MenuItem onClick={onClose}>
        <SvgIcon fontSize="small">
          <Edit02 />
        </SvgIcon>
        Edit
      </MenuItem> */}
      <MenuItem
        onClick={onDelete}
        sx={{ color: 'error.main' }}
      >
        <SvgIcon fontSize="small">
          <Trash02Icon />
        </SvgIcon>
        Delete
      </MenuItem>
    </Menu>
  );
};

ItemMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool
};
