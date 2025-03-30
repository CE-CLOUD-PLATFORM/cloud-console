// 'use client';
import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Link from 'next/link';
import LayoutAlt04 from '@untitled-ui/icons-react/build/esm/LayoutAlt04';
import Server01 from '@untitled-ui/icons-react/build/esm/Server01';
import User01 from '@untitled-ui/icons-react/build/esm/User01';

export default function SidebarGroup() {
  const menus = [
    { name: 'Overview', icon: <LayoutAlt04 />, link: 'overview' },
    { name: 'Instances', icon: <Server01 />, link: 'instance' },
    { name: 'Member', icon: <User01 />, link: 'member' },
  ];

  return (
    <Box className="hidden bg-white md:block md:min-w-56" role="presentation">
      <Divider />
      <List>
        {menus.map((menu) => (
          <Link href={menu.link} key={menu.name}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menu.icon}</ListItemIcon>

                <ListItemText primary={menu.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
