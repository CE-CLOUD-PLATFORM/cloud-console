/* eslint-disable no-unused-vars */
import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TablePagination,
  Typography,
} from '@mui/material';
import { Scrollbar } from '@/shared/components/scrollbar';
import { ItemListCard } from './item-list-card';
import { ItemListRow } from './item-list-row';
import type { Subject } from '@/modules/subject/types/subject';

type View = 'grid' | 'list';

interface ItemListProps {
  count?: number;
  items?: Subject[];
  onDelete?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  view?: View;
  isLoading: boolean;
}

export const ItemList: FC<ItemListProps> = (props) => {
  const {
    count = 0,
    items = [],
    onDelete,
    onOpen,
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 9, // ให้มีค่า default
    view = 'grid',
    isLoading = true,
  } = props;

  // คำนวณข้อมูลที่แสดงผลตาม page และ rowsPerPage
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);

  let content: JSX.Element;

  if (view === 'grid') {
    content = (
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {displayedItems.map((item) => (
          <ItemListCard
            key={item.id}
            item={item}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        ))}
      </Box>
    );
  } else {
    content = (
      <Box sx={{ m: 1 }}>
        <Scrollbar>
          <Box sx={{ p: 1 }}>
            <Table
              sx={{
                minWidth: 600,
                borderCollapse: 'separate',
                borderSpacing: '0 4px',
              }}
            >
              <TableBody>
                {displayedItems.map((item) => (
                  <ItemListRow
                    key={item.id}
                    item={item}
                    onDelete={onDelete}
                    onOpen={onOpen}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
      </Box>
    );
  }
  return (
    <Stack spacing={4} className="flex-grow">
      {content}
      {!isLoading && count === 0 && (
        <Box display={'flex'} justifyContent={'center'}>
          <Typography className="text-slate-500" variant="subtitle1">
            No subjects found.
          </Typography>
        </Box>
      )}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[9, 18]}
      />
    </Stack>
  );
};

ItemList.propTypes = {
  items: PropTypes.array,
  count: PropTypes.number,
  onDelete: PropTypes.func,
  onOpen: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  view: PropTypes.oneOf<View>(['grid', 'list']),
};