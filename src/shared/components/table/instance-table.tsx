/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import type { FC } from 'react';
import './style.css';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Copy03 from '@untitled-ui/icons-react/build/esm/Copy03';
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
import type {
  Flavor,
  Image,
  Instance,
  InstanceStatus,
} from '@/modules/instance/types/instance';
import type { SeverityPillColor } from '@/shared/components/severity-pill';
import { SeverityPill } from '@/shared/components/severity-pill';
import CircleLoading from '../Loading/CircleLoading';
import { copyToClipboard } from '@/shared/utils/clipboard';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { Trash02 } from '@untitled-ui/icons-react';

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
  isLoading: boolean;
  onDelete: (item: Instance) => void;
}
export const TableInstances: FC<TableInstanceProps> = ({
  data,
  flavors,
  images,
  isLoading,
  onDelete,
}) => {
  const { subject_id } = useParams();
  const router = useRouter();
  const getFlavorName = (id: string) => {
    const flavorName = flavors.find((flavor) => flavor.id === id)?.name || '';
    return flavorName;
  };
  const getImageLogo = (id: string) => {
    return (
      images.find((image) => image.id === id)?.Properties?.logo_url ||
      '/assets/os.png'
    );
  };
  const getImageName = (id: string) => {
    return images.find((image) => image.id === id)?.name || '';
  };
  const handleOnEdit = (id: string) => {};
  const handleOnOpen = (id: string) => {
    router.push(`/management/instance/${subject_id}/${id}/overview`);
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
                <TableCell padding="checkbox">{/* <Checkbox /> */}</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>flavor</TableCell>
                <TableCell>internal IP</TableCell>
                <TableCell>domain</TableCell>
                {/* <TableCell>created</TableCell>
                <TableCell>updated</TableCell> */}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((instance) => {
                return (
                  <TableRow hover key={instance.id}>
                    <TableCell padding="checkbox">
                      {/* <Checkbox /> */}
                    </TableCell>
                    <TableCell
                      sx={{
                        '&': {
                          paddingLeft: '0px',
                        },
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
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
                            onClick={() => {
                              let InstanceStatusActive: InstanceStatus =
                                'ACTIVE';
                              if (instance.status === InstanceStatusActive) {
                                handleOnOpen(instance.id);
                              }
                            }}
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
                      {instance.accessIPv4}
                      <IconButton
                        onClick={() => {
                          copyToClipboard(
                            instance.accessIPv4,
                            () => {
                              toast.success(
                                'IP Copied to clipboard successfully!',
                              );
                            },
                            () => {
                              toast.error('Failed to copy IP to clipboard');
                            },
                          );
                        }}
                      >
                        <SvgIcon fontSize="small">
                          <Copy03 />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      {instance.metadata.domain_name &&
                      instance.metadata.domain_name !== ''
                        ? instance.metadata.domain_name
                        : '-'}
                      {instance.metadata.domain_name &&
                        instance.metadata.domain_name !== '' && (
                          <IconButton
                            onClick={() => {
                              copyToClipboard(
                                instance.metadata.domain_name,
                                () => {
                                  toast.success(
                                    'Domain Copied to clipboard successfully!',
                                  );
                                },
                                () => {
                                  toast.error(
                                    'Failed to copy Domain to clipboard',
                                  );
                                },
                              );
                            }}
                          >
                            <SvgIcon fontSize="small">
                              <Copy03 />
                            </SvgIcon>
                          </IconButton>
                        )}
                    </TableCell>
                    {/* <TableCell>
                      {getDateddMMYYYYHHmmss(instance.created)}
                    </TableCell>
                    <TableCell>
                      {getDateddMMYYYYHHmmss(instance.updated)}
                    </TableCell> */}
                    <TableCell align="right">
                      {/* <IconButton onClick={() => handleOnEdit(instance.id)}>
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton> */}
                      <IconButton onClick={() => onDelete(instance)}>
                        <SvgIcon>
                          <Trash02 />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {data.length === 0 && !isLoading && (
            <Box mt={3} display={'flex'} justifyContent={'center'}>
              <Typography className="text-slate-500" variant="subtitle1">
                No instances found.
              </Typography>
            </Box>
          )}
          {isLoading && <CircleLoading />}
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
