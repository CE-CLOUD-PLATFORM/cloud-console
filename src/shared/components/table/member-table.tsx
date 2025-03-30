/* eslint-disable no-unused-vars */
import type { FC } from 'react';
import './style.css';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Box,
  Card,
  Checkbox,
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
  Typography,
} from '@mui/material';
import { Scrollbar } from '@/shared/components/scrollbar';
import type { Member } from '@/modules/user/types/member';
import { Trash01 } from '@untitled-ui/icons-react';
import { useGetRoles } from '@/modules/roles/hook/use-get-role-list';

// interface Option {
//   label: string;
//   value: string;
// }

// const sortOptions: Option[] = [
//   {
//     label: 'Last update (newest)',
//     value: 'updatedAt|desc',
//   },
//   {
//     label: 'Last update (oldest)',
//     value: 'updatedAt|asc',
//   },
//   {
//     label: 'Total orders (highest)',
//     value: 'orders|desc',
//   },
//   {
//     label: 'Total orders (lowest)',
//     value: 'orders|asc',
//   },
// ];
interface TableMembersProps {
  members: Member[];
}
export const TableMembers: FC<TableMembersProps> = ({ members }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  const { data: roleData, isFetched } = useGetRoles();
  const roleKeyName = Object.fromEntries(
    roleData?.roles.map((item) => [item.id, item.name]) || [],
  );
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
          {/* <TextField
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
          </TextField> */}
        </Stack>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell
                  align="right"
                  sx={{ whiteSpace: 'nowrap', width: '1%' }}
                >
                  Role
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ whiteSpace: 'nowrap', width: '1%' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members?.map((member) => (
                <TableRow hover key={member.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="body1">{member.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ whiteSpace: 'nowrap', width: '1%' }}
                  >
                    {roleKeyName[member.role]}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ whiteSpace: 'nowrap', width: '1%' }}
                  >
                    <IconButton>
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton>
                      <SvgIcon>
                        <Trash01 />
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
          count={members?.length || 0}
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
