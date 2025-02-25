import type { FC } from 'react';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import './style.css';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Scrollbar } from '@/shared/components/scrollbar';
import {
  Flavor,
  Image,
  Instance,
  InstanceStatus,
} from '@/modules/instance/types/instance';
import {
  SeverityPill,
  SeverityPillColor,
} from '@/shared/components/severity-pill';
import { getDateddMMYYYYHHmmss } from '@/shared/utils/date-locale';

interface Option {
  label: string;
  value: string;
}
const labelColors: Record<InstanceStatus, SeverityPillColor> = {
  ACTIVE: 'success',
  BUILD: 'warning',
  REBUILD: 'warning',
  SHUTOFF: 'info',
};
const sortOptions: Option[] = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc',
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc',
  },
  {
    label: 'Total orders (highest)',
    value: 'orders|desc',
  },
  {
    label: 'Total orders (lowest)',
    value: 'orders|asc',
  },
];
interface TableInstanceProps {
  data: Instance[];
  flavors: Flavor[];
  images: Image[];
}
export const TableInstances: FC<TableInstanceProps> = ({
  data,
  flavors,
  images,
}) => {
  const getFlavorName = (id: string) => {
    const flavorName = flavors.find((flavor) => flavor.id === id)?.name || '';
    return flavorName;
  };
  const getImageLogo = (id: string) => {
    return (
      images.find((image) => image.id === id)?.metadata?.logo_url ||
      '/assets/os.png'
    );
  };
  const getImageName = (id: string) => {
    return images.find((image) => image.id === id)?.name || '';
  };
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
      }}
    >
      <Card>
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={2}
          sx={{ p: 3 }}
        >
          <OutlinedInput
            placeholder="Search instances"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="Sort By"
            name="sort"
            select
            SelectProps={{ native: true }}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Stack>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>flavor</TableCell>
                <TableCell>created</TableCell>
                <TableCell>updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((instance) => {
                return (
                  <TableRow hover key={instance.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <Avatar
                          src={getImageLogo(instance.metadata.image_id)}
                          sx={{
                            height: 42,
                            width: 42,
                          }}
                        />
                        <Stack display={'flex'} direction={'column'}>
                          <Link
                            color="inherit"
                            className="cursor-pointer"
                            variant="subtitle1"
                          >
                            {instance.name}
                          </Link>
                          <Typography variant="body2">
                            {getImageName(instance.metadata.image_id)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={labelColors[instance.status]}>
                        {instance.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{getFlavorName(instance.flavor.id)}</TableCell>
                    <TableCell>
                      {getDateddMMYYYYHHmmss(instance.created)}
                    </TableCell>
                    <TableCell>
                      {getDateddMMYYYYHHmmss(instance.updated)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton>
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={data?.length || 0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </Box>
  );
};
