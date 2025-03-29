import Image from 'next/image';
import type { FC } from 'react';

export const ItemIcon: FC = () => {
  return <Image width={50} height={50} src="/assets/icons/group.png" alt="logo" />;
};
