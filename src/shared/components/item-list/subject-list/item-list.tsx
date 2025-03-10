import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Table, TableBody, TablePagination } from '@mui/material';
import { Scrollbar } from '@/shared/components/scrollbar';
import { ItemListCard } from './item-list-card';
import { ItemListRow } from './item-list-row';
import { Subject } from '@/modules/subject/types/subject';

type View = 'grid' | 'list';

interface ItemListProps {
  count?: number;
  items?: Subject[];
  onDelete?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  view?: View;
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
    rowsPerPage = 0,
    view = 'grid'
  } = props;

  let content: JSX.Element;

  if (view === 'grid') {
    content = (
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(3, 1fr)'
        }}
      >
        {items?.map((item) => (
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
    // Negative margin is a fix for the box shadow. The virtual scrollbar cuts it.
    content = (
      <Box sx={{ m: 1 }}>
        <Scrollbar>
          <Box sx={{ p: 1 }}>
            <Table
              sx={{
                minWidth: 600,
                borderCollapse: 'separate',
                borderSpacing: '0 4px'
              }}
            >
              <TableBody >
                {items.map((item) => (
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
    <Stack spacing={4} className='flex-grow'>
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
  onOpen: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  view: PropTypes.oneOf<View>(['grid', 'list'])
};
