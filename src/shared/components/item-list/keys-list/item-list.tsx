/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Table, TableBody, TablePagination } from '@mui/material';
import { Scrollbar } from '@/shared/components/scrollbar';
import { ItemListRow } from './item-list-row';
import { PublicKey } from '@/modules/config/types/public-key';

interface ItemListProps {
  count?: number;
  items?: PublicKey[];
  onDelete?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
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
    items = [],
    onDelete,
    onOpen,
  } = props;
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

  return (
    <Stack spacing={4}>
      {content}
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
};
