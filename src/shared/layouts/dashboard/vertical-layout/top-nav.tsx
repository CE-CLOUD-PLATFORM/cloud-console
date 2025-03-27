'use client';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import type { Theme } from '@mui/material';
import { Box, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountButton } from '../account-button';
import { ContactsButton } from '../contacts-button';
import { LanguageSwitch } from '../language-switch';
import { NotificationsButton } from '../notifications-button';
import { SearchButton } from '../search-button';
import { useAppNavStore } from '@/modules/app/store/use-app-nav-store';

const TOP_NAV_HEIGHT: number = 64;
const SIDE_NAV_WIDTH: number = 280;

interface TopNavProps {
  onMobileNavOpen?: () => void;
  sizeNav: number;
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNavOpen, sizeNav, ...other } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const title = useAppNavStore((state) => state.title);

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        position: 'sticky',
        left: {
          lg: `${sizeNav}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${sizeNav}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {!lgUp && (
            <IconButton onClick={onMobileNavOpen}>
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )}
          {/* <SearchButton /> */}
          {/* <Typography variant='h6'>{title}</Typography> */}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <AccountButton />
        </Stack>
      </Stack>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
};
