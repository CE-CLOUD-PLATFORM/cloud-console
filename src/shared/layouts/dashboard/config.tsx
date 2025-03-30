/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@mui/material';

import HomeSmileIcon from '@/shared/icons/untitled-ui/duocolor/home-smile';
import { paths } from '@/paths';
import { Settings03, Settings02, Dataflow01 } from '@untitled-ui/icons-react';

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
            title: 'Dashboard',
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          // {
          //   title: 'Instances',
          //   path: paths.dashboard.analytics,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <Server01 />
          //     </SvgIcon>
          //   ),
          // },
          {
            title: 'Resource',
            path: paths.resource.index,
            icon: (
              <SvgIcon fontSize="small">
                <Dataflow01 />
              </SvgIcon>
            ),
            items: [
              {
                title: 'Quota',
                path: paths.resource.quota,
              },
              // {
              //   title: 'Credit',
              //   path: paths.resource.credit,
              // },
            ],
          },
          {
            title: 'Access',
            path: paths.setting.access.index,
            icon: (
              <SvgIcon fontSize="small">
                <Settings03 />
              </SvgIcon>
            ),
            items: [
              {
                title: 'Public keys',
                path: paths.setting.access.public_key,
              },
              // {
              //   title: 'VPN',
              //   path: paths.setting.access.index,
              // },
            ],
          },

          {
            title: 'Setting',
            path: paths.setting.index,
            icon: (
              <SvgIcon fontSize="small">
                <Settings02 />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
