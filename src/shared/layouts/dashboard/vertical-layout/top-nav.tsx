'use client';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import type { Theme } from '@mui/material';
import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountButton } from '../account-button';
import { RouterLink } from '@/shared/components/router-link';
import { paths } from '@/paths';
import Image from 'next/image';
import BreadcrumbsComponent from '@/shared/components/breadcrumbs/navbar';
const TOP_NAV_HEIGHT: number = 64;
// const SIDE_NAV_WIDTH: number = 280;

interface TopNavProps {
  onMobileNavOpen?: () => void;
  sizeNav: number;
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNavOpen, sizeNav, ...other } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  // const title = useAppNavStore((state) => state.title);

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
            <>
              <Box
                component={RouterLink}
                href={paths.subject.index}
                sx={{
                  display: 'flex',
                  height: 40,
                  p: '4px',
                  width: 40,
                  borderRadius: '10px',
                  transitionDuration: '0.5s',
                  '&:hover': {
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Image
                  width={50}
                  height={50}
                  src="/assets/ce-logo.png"
                  alt="logo"
                />
              </Box>
              <IconButton onClick={onMobileNavOpen}>
                <SvgIcon>
                  <Menu01Icon />
                </SvgIcon>
              </IconButton>
              <BreadcrumbsComponent />
            </>
          )}
        </Stack>
        {/* <SearchButton /> */}
        {/* <Typography variant='h6'>{title}</Typography> */}

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
