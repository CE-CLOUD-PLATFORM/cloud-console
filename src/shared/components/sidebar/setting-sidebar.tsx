// 'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Key01 } from '@untitled-ui/icons-react';
import Link from 'next/link';
export default function SidebarSetting() {
  const menus = [
    { name: 'SSH', icon: <Key01 />, link: '/setting/access/keys' },
  ];

  return (
    <Box className="hidden bg-white md:block md:min-w-56" role="presentation">
      <Divider />
      <List>
        {menus.map((menu) => (
          <Link href={menu.link}  replace={true} key={menu.name}>
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
