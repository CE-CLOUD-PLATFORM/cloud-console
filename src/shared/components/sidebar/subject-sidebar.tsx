// 'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Server01 from '@untitled-ui/icons-react/build/esm/Server01';
import User01 from '@untitled-ui/icons-react/build/esm/User01';
import Users01 from '@untitled-ui/icons-react/build/esm/Users01';
import Link from 'next/link';
export default function SidebarSubject() {
  const menus = [
    // { name: 'Overview', icon: <LayoutAlt04 />, link: 'overview' },
    { name: 'Instances', icon: <Server01 />, link: 'instance' },
    { name: 'Groups', icon: <Users01 />, link: 'group' },
    { name: 'Members', icon: <User01 />, link: 'member' },
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
