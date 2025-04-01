/* eslint-disable no-unused-vars */
import { ChangeEvent, useState, type FC ,MouseEvent} from 'react';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import './style.css';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import ChevronUp from '@untitled-ui/icons-react/build/esm/ChevronUp';
import ChevronDown from '@untitled-ui/icons-react/build/esm/ChevronDown';
import {
  Box,
  Card,
  Chip,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
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
import type { handleQuotaDialogType } from '@/app/(dashboard)/management/resource/quota/page';
import type { Quota, QuotaStatus } from '@/modules/resource/types/quota';
import type { SeverityPillColor } from '@/shared/components/severity-pill';
import { SeverityPill } from '@/shared/components/severity-pill';
import { useUserStore } from '@/modules/auth/store/auth';
const statusOptions: { label: string; value: QuotaStatus | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Requesting', value: 'requesting' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Revision Required', value: 'revision_required' },
];
const labelColors: Record<QuotaStatus, SeverityPillColor> = {
  accepted: 'success',
  pending: 'info',
  rejected: 'error',
  requesting: 'info',
  revision_required: 'warning',
};
interface TableQuotaProps {
  quotas: Quota[];
  onOpen: (data: handleQuotaDialogType) => void;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
}
export const TableQuota: FC<TableQuotaProps> = ({ quotas, onOpen }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const handleToggle = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const { admin } = useUserStore();
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
            label="Filter by Status"
            name="status"
            select
            SelectProps={{ native: true }}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Stack>
        <Scrollbar
          sx={{
            '& simplebar-content-wrapper': {
              scrollbarWidth: 'auto',
              bgcolor: 'red',
            },
            '&::-webkit-scrollbar': {
              display: 'auto',
            },
          }}
        >
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap', width: '1%' }}>
                  Subject Name
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Request by</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell
                  align="right"
                  sx={{ whiteSpace: 'nowrap', width: '1%' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(selectedStatus
                ? quotas.filter((quota) => quota.status === selectedStatus)
                : quotas
              )?.map((quota) => (
                <TableRow hover key={quota.id}>
                  <TableCell>
                    <Typography className="text-nowrap pl-2" variant="body1">
                      {quota.subject_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={labelColors[quota.status as QuotaStatus]}
                    >
                      {quota.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <Stack display={'flex'} direction={'row'} spacing={1}>
                      <Chip label={`CORES: ${quota.req_resource.cores}`} />
                      <Chip
                        label={`INSTANCE: ${quota.req_resource.max_instance}`}
                      />
                      <Chip
                        label={`RAM: ${(quota.req_resource.memory as number) / 1024} GB`}
                      />
                    </Stack>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: expandedRow === quota.id ? 'none' : 'block',
                      }}
                    >
                      {quota.detail}
                    </Typography>
                    <Collapse in={expandedRow === quota.id}>
                      <Typography variant="body2">{quota.detail}</Typography>
                    </Collapse>
                    <IconButton
                      size="small"
                      onClick={() => handleToggle(quota.id)}
                    >
                      {expandedRow === quota.id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {quota.request_user_id}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    }).format(new Date(quota.created_at))}
                  </TableCell>
                  <TableCell>{quota.subject_academic_year}</TableCell>
                  <TableCell className="flex-nowrap text-nowrap">
                    {/* <IconButton
                      onClick={() => {
                        onOpen?.({
                          item: quota,
                          edit: true,
                        });
                      }}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton> */}
                    {admin && (
                      <IconButton
                        disabled={!(quota.status === "pending")}
                        onClick={() => {
                          onOpen?.({
                            item: quota,
                            edit: false,
                          });
                        }}
                      >
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={quotas?.length || 0}
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
