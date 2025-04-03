/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import type { FC } from 'react';
import '../style.css';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Copy03 from '@untitled-ui/icons-react/build/esm/Copy03';
import {
  Avatar,
  Box,
  Card,
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
import CircleLoading from '../../Loading/CircleLoading';
import { copyToClipboard } from '@/shared/utils/clipboard';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
import { usePopover } from '@/shared/hooks/use-popover';
import { ItemMenu } from './item-menu';
import { useExternalAccess } from '@/modules/instance/hook/use-external-access';
import { useQueryClient } from '@tanstack/react-query';
interface Option {
  label: string;
  value: string;
}
const labelColors: Record<InstanceStatus, SeverityPillColor> = {
  ACTIVE: 'success',
  BUILD: 'warning',
  DELETED: 'error',
  ERROR: 'primary',
  HARD_REBOOT: 'primary',
  MIGRATING: 'primary',
  PASSWORD: 'primary',
  PAUSED: 'warning',
  REBOOT: 'warning',
  REBUILD: 'warning',
  RESCUE: 'primary',
  RESIZE: 'primary',
  REVERT_RESIZE: 'primary',
  SHELVED: 'info',
  SHELVED_OFFLOADED: 'primary',
  SHUTOFF: 'error',
  SOFT_DELETED: 'primary',
  SUSPENDED: 'primary',
  UNKNOWN: 'primary',
  VERIFY_RESIZE: 'primary',
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
  onInternal: (item: Instance) => void;
}
export const TableInstances: FC<TableInstanceProps> = ({
  data,
  flavors,
  images,
  isLoading,
  onDelete,
  onInternal,
}) => {
  const { subject_id } = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();
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
  const handleOnOpen = (id: string) => {
    router.push(`/management/instance/${subject_id}/${id}/overview`);
  };
  const popover = usePopover<HTMLButtonElement>();

  const exposeExternalAccess = useExternalAccess({
    onSuccess: () => {
      toast.success('Expose Successfully');
      queryClient.invalidateQueries({ queryKey: ['instances'] });
    },
    onError: () => {
      toast.error('Fail to Expose Instance.');
    },
    onMutate: () => {
      toast.loading('Exposing Instance...');
    },
  });

  const handleExpose = (data: Instance) => {
    try {
      const external_access = {
        instance_id: data.id,
        subject_id: data.tenant_id,
      };
      exposeExternalAccess.mutate(external_access);
    } catch (err) {
      console.log(err);
    }
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
                              const InstanceStatusActive: InstanceStatus =
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
                      <IconButton
                        onClick={popover.handleOpen}
                        ref={popover.anchorRef}
                      >
                        <SvgIcon fontSize="small">
                          <DotsVerticalIcon />
                        </SvgIcon>
                      </IconButton>
                      <ItemMenu
                        anchorEl={popover.anchorRef.current}
                        onClose={popover.handleClose}
                        onDelete={() => onDelete(instance)}
                        open={popover.open}
                        data={instance}
                        onExpose={() => handleExpose(instance)}
                        onMakeInternal={() => onInternal(instance)}
                      />
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
