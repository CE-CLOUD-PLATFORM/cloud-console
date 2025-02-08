"use client"
import type { FC, ReactNode } from 'react';
import { useSections } from './config';
import { VerticalLayout } from './vertical-layout';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const sections = useSections();

  return <VerticalLayout sections={sections} {...props} />;
};

