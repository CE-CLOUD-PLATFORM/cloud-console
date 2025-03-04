import { useState, type FC } from 'react';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import './style.css';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import ChevronUp from '@untitled-ui/icons-react/build/esm/ChevronUp';
import ChevronDown from '@untitled-ui/icons-react/build/esm/ChevronDown';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Chip,
  Collapse,
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
import { Member } from '@/modules/user/types/member';
import { Quota } from '@/modules/subject/types/quota';

interface Option {
  label: string;
  value: string;
}

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
interface TableQuotaProps {
  quotas: Quota[];
}
export const TableCredit: FC<TableQuotaProps> = ({ quotas }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
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
                <TableCell sx={{ whiteSpace: 'nowrap', width: '1%' }}>
                  Credit
                </TableCell>
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
              {quotas?.map((quota) => (
                <>
                  <TableRow hover key={quota.id}>
                    <TableCell>
                      <Typography className="text-nowrap pl-2" variant="body2">
                        144
                      </Typography>
                    </TableCell>
                    <TableCell>
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
                    <TableCell className='text-nowrap'>
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
                </>
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
