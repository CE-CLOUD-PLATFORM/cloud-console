import type { FC } from 'react';
import BookOpen01Icon from '@untitled-ui/icons-react/build/esm/BookOpen01';
import Briefcase01Icon from '@untitled-ui/icons-react/build/esm/Briefcase01';
import Home02Icon from '@untitled-ui/icons-react/build/esm/Home02';
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';
import type { Subject } from '@/modules/subject/types/subject';
interface DataProps {
  data: Subject;
}
export const SubjectDetails: FC<DataProps> = ({ data }) => {
  console.log(data);

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
        p: 1,
        width: '100%',
      }}
    >
      <Card>
        <CardHeader
          title={`Subject: ${data.name}`}
        />
        <CardContent>
          <List>
            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Briefcase01Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subtitle2">
                    Product Designer at{' '}
                    <Link color="text.primary" href="#" variant="subtitle2">
                      Devias
                    </Link>
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" variant="caption">
                    Past: UX Designer{' '}
                    <Link color="text.secondary" href="#" variant="caption">
                      Focus Aesthetic Dynamics
                    </Link>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <BookOpen01Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link
                    color="text.secondary"
                    sx={{ cursor: 'pointer' }}
                    variant="body2"
                  >
                    Add school or collage
                  </Link>
                }
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Home02Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subtitle2">
                    Lives in{' '}
                    <Link color="text.primary" href="#" variant="subtitle2">
                      Bucharest
                    </Link>
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" variant="caption">
                    Originally from{' '}
                    <Link color="text.secondary" href="#" variant="caption">
                      Rm. Valcea
                    </Link>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Mail01Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">
                    katarina.smith@devias.io
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
