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
import { Credit } from '@/modules/subject/types/credit';
import { handleCreditDialogType } from '@/app/(dashboard)/management/resource/credit/page';

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
interface TablecreditProps {
  credits: Credit[];
  onOpen: (data: handleCreditDialogType) => void;
}
export const TableCredit: FC<TablecreditProps> = ({ credits, onOpen }) => {
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
                <TableCell
                  align="right"
                  sx={{ whiteSpace: 'nowrap', width: '1%' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {credits?.map((credit) => (
                  <TableRow hover key={credit.id}>
                    <TableCell>
                      <Typography
                        className="text-nowrap pl-2"
                        variant="overline"
                        style={{
                          fontSize: 16,
                        }}
                      >
                        144
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack display={'flex'} gap={1} direction={'row'}>
                        <Typography
                          className="text-nowrap pl-2 !text-[15px]"
                          variant="caption"
                        >
                          Calculate for:
                        </Typography>
                        <Chip label={`Flavor: ${credit.resource.flavor_id}`} />
                        <Chip label={`Instance: ${credit.resource.instance}`} />
                        <Chip label={`Time Usage: ${credit.resource.time}`} />
                      </Stack>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          maxWidth: '300px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: expandedRow === credit.id ? 'none' : 'block',
                        }}
                      >
                        {credit.resource.details}
                      </Typography>
                      <Collapse in={expandedRow === credit.id}>
                        <Typography variant="body2">
                          {credit.resource.details}
                        </Typography>
                      </Collapse>
                      <IconButton
                        size="small"
                        onClick={() => handleToggle(credit.id)}
                      >
                        {expandedRow === credit.id ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {credit.request_user_id}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      }).format(new Date(credit.created_at))}
                    </TableCell>

                    <TableCell className="flex-nowrap text-nowrap">
                      <IconButton
                        onClick={() => {
                          onOpen?.({
                            item: credit,
                            edit: true,
                          });
                        }}
                      >
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          onOpen?.({
                            item: credit,
                            edit: false,
                          });
                        }}
                      >
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={credits?.length || 0}
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
