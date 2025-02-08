"use client"
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, SvgIcon } from '@mui/material';
import BarChartSquare02Icon from '@/shared/icons/untitled-ui/duocolor/bar-chart-square-02';
import CurrencyBitcoinCircleIcon from '@/shared/icons/untitled-ui/duocolor/currency-bitcoin-circle';
import HomeSmileIcon from '@/shared/icons/untitled-ui/duocolor/home-smile';
import LineChartUp04Icon from '@/shared/icons/untitled-ui/duocolor/line-chart-up-04';
import { tokens } from '@/shared/locales/tokens';
import { paths } from '@/paths';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.analytics),
            path: paths.dashboard.analytics,
            icon: (
              <SvgIcon fontSize="small">
                <BarChartSquare02Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.ecommerce),
            path: paths.dashboard.ecommerce,
            icon: (
              <SvgIcon fontSize="small">
                <LineChartUp04Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.crypto),
            path: paths.dashboard.crypto,
            icon: (
              <SvgIcon fontSize="small">
                <CurrencyBitcoinCircleIcon />
              </SvgIcon>
            ),
            label: <Chip color="primary" label="New" size="small" />,
          },
          {
            title: t(tokens.nav.account),
            path: paths.dashboard.account,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
