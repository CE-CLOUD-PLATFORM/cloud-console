'use client';
import type { FC, ReactNode } from 'react';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Section } from '../config';
import { MobileNav } from '../mobile-nav';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { useMobileNav } from './use-mobile-nav';

const SIDE_NAV_WIDTH: number = 240;

const VerticalLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  overflowY: 'scroll',
  height: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const VerticalLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems:'center',
});

interface VerticalLayoutProps {
  children?: ReactNode;
  sections?: Section[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mobileNav = useMobileNav();

  return (
    <>
      <TopNav sizeNav={SIDE_NAV_WIDTH} onMobileNavOpen={mobileNav.handleOpen} />
      {lgUp && (
        <SideNav
          // color={navColor}
          sizeNav={SIDE_NAV_WIDTH}
          sections={sections}
        />
      )}
      {!lgUp && (
        <MobileNav
          // color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          sections={sections}
        />
      )}
      <VerticalLayoutRoot>
        <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  );
};
