'use client';
import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StorageIcon from '@mui/icons-material/Storage';
import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link';

export default function SidebarInstance() {
  const menus = [
    { name: 'Overview', icon: <SpaceDashboardIcon />, link: 'overview' },
    { name: 'Instances', icon: <StorageIcon />, link: 'instance' },
    { name: 'Group', icon: <GroupsIcon />, link: 'group' },
  ];

  return (
    <Box
      className="hidden min-h-screen bg-white md:block md:min-w-56"
      role="presentation"
    >
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
