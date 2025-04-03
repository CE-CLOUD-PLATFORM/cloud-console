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
  onExpose?: () => void;
  onStart?: () => void;
  onStop?: () => void;
  onReboot?: () => void;
  onMakeInternal?: () => void;
}

export const ItemMenu: FC<ItemMenuProps> = (props) => {
  const {
    anchorEl,
    onClose,
    onDelete,
    open = false,
    data,
    onExpose,
    onMakeInternal,
    onStart,
    onStop,
    onReboot,
  } = props;
  const InstancePause: InstanceStatus = 'PAUSED';
  const InstanceActive: InstanceStatus = 'ACTIVE';
  const InstanceReboot: InstanceStatus = 'REBOOT';
  const InstanceSHUTOFF: InstanceStatus = 'SHUTOFF';
  const handleOnExpose = () => {
    onClose?.();
    onExpose?.();
  };
  const handleOnMakeInternal = () => {
    onClose?.();
    onMakeInternal?.();
  };
  const handleOnStart = () => {
    onClose?.();
    onStart?.();
  };
  const handleOnStop = () => {
    onClose?.();
    onStop?.();
  };
  const handleOnReboot = () => {
    onClose?.();
    onReboot?.();
  };
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
      <MenuItem
        disabled={!(data.status === InstancePause || data.status === InstanceSHUTOFF)}
        onClick={handleOnStart}
      >
        <SvgIcon fontSize="small">
          <Play />
        </SvgIcon>
        Start
      </MenuItem>
      <MenuItem
        disabled={!(data.status === InstanceActive)}
        onClick={handleOnStop}
      >
        <SvgIcon fontSize="small">
          <Power01 />
        </SvgIcon>
        Stop
      </MenuItem>
      <MenuItem
        disabled={
          !!data.metadata.domain_name && data.metadata.domain_name.length > 0
        }
        onClick={handleOnExpose}
      >
        <SvgIcon fontSize="small">
          <Globe02 />
        </SvgIcon>
        Expose
      </MenuItem>
      <MenuItem
        disabled={!data.metadata.domain_name}
        onClick={handleOnMakeInternal}
      >
        <SvgIcon fontSize="small">
          <SlashCircle01 />
        </SvgIcon>
        Make Internal
      </MenuItem>
      <MenuItem
        disabled={
          data.status === InstanceReboot || data.status === InstancePause || data.status === InstanceSHUTOFF
        }
        onClick={handleOnReboot}
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
  onExpose: PropTypes.func,
  onMakeInternal: PropTypes.func,
  data: PropTypes.any,
};
