import type {
  Instance,
  InstanceStatus,
} from '@/modules/instance/types/instance';
import { Menu, MenuItem, menuItemClasses, SvgIcon } from '@mui/material';
import {
  Globe02,
  Play,
  Power01,
  RefreshCcw05,
  SlashCircle01,
} from '@untitled-ui/icons-react';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import PropTypes from 'prop-types';
import type { FC } from 'react';

interface ItemMenuProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  onDelete?: () => void;
  open?: boolean;
  data: Instance;
  expose?: () => void;
  internal?: () => void;
}

export const ItemMenu: FC<ItemMenuProps> = (props) => {
  const {
    anchorEl,
    onClose,
    onDelete,
    open = false,
    data,
    expose,
    internal,
  } = props;
  const InstancePause: InstanceStatus = 'PAUSED';
  const InstanceActive: InstanceStatus = 'ACTIVE';
  const InstanceReboot: InstanceStatus = 'REBOOT';
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      sx={{
        [`& .${menuItemClasses.root}`]: {
          fontSize: 14,
          '& svg': {
            mr: 1,
          },
        },
      }}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
    >
      <MenuItem disabled={!(data.status === InstancePause)} onClick={onClose}>
        <SvgIcon fontSize="small">
          <Play />
        </SvgIcon>
        Start
      </MenuItem>
      <MenuItem disabled={!(data.status === InstanceActive)} onClick={onClose}>
        <SvgIcon fontSize="small">
          <Power01 />
        </SvgIcon>
        Stop
      </MenuItem>
      <MenuItem disabled={!!data.metadata.domain_name} onClick={expose}>
        <SvgIcon fontSize="small">
          <Globe02 />
        </SvgIcon>
        Expose
      </MenuItem>
      <MenuItem disabled={!data.metadata.domain_name} onClick={internal}>
        <SvgIcon fontSize="small">
          <SlashCircle01 />
        </SvgIcon>
        Make Internal
      </MenuItem>
      <MenuItem
        disabled={
          data.status === InstanceReboot || data.status === InstancePause
        }
        onClick={onClose}
      >
        <SvgIcon fontSize="small">
          <RefreshCcw05 />
        </SvgIcon>
        Reboot
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
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
  open: PropTypes.bool,
  expose: PropTypes.func,
  internal: PropTypes.func,
  data: PropTypes.any,
};
