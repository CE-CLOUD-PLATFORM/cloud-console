/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Table, TableBody, TablePagination } from '@mui/material';
import { Scrollbar } from '@/shared/components/scrollbar';
import { ItemListRow } from './item-list-row';
import type { Group } from '@/modules/group/types/group';

interface ItemListProps {
  count?: number;
  items?: Group[];
  onDelete?: (item: Group) => void;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
}

export const ItemList: FC<ItemListProps> = (props) => {
  const {
    count = 0,
    items = [],
    onDelete,
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);
  let content: JSX.Element;

  content = (
    <Box sx={{ m: 1 }}>
      <Scrollbar>
        <Box>
          <Table
            sx={{
              minWidth: 600,
              borderCollapse: 'separate',
              borderSpacing: '0 8px'
            }}
          >
            <TableBody>
              {displayedItems.map((item) => (
                <ItemListRow
                  key={item.id}
                  item={item}
                  onDelete={onDelete}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Box>
  );

  return (
    <Stack spacing={4}>
      {content}
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
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
