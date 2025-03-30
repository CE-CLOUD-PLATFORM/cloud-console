/* eslint-disable no-unused-vars */
import type { ChangeEvent, FC, FormEvent, MouseEvent } from 'react';
import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid01Icon from '@untitled-ui/icons-react/build/esm/Grid01';
import ListIcon from '@untitled-ui/icons-react/build/esm/List';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Box,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from '@mui/material';

interface Filters {
  query?: string;
}

type View = 'grid' | 'list';

type SortDir = 'asc' | 'desc';

interface SortOption {
  label: string;
  value: SortDir;
}

const sortOptions: SortOption[] = [
  {
    label: 'Name(asc)',
    value: 'asc',
  },
  {
    label: 'Name(desc)',
    value: 'desc',
  },
];

interface ItemSearchProps {
  onFiltersChange?: (filters: Filters) => void;
  onSortChange?: (sort: SortDir) => void;
  onViewChange?: (view: View) => void;
  sortBy?: string;
  sortDir?: SortDir;
  view?: View;
}

export const ItemSearch: FC<ItemSearchProps> = (props) => {
  const {
    onFiltersChange,
    onSortChange,
    onViewChange,
    view = 'grid',
    sortBy = 'name',
    sortDir = 'asc',
  } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
      event.preventDefault();
      const query = queryRef.current?.value || '';

      onFiltersChange?.({
        query,
      });
    },
    [onFiltersChange],
  );

  const handleSortChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const sortDir = event.target.value as SortDir;
      onSortChange?.(sortDir);
    },
    [onSortChange],
  );

  return (
    <Card>
      <Stack alignItems="center" direction="row" gap={2} sx={{ p: 2 }}>
        <Box component="form" sx={{ flexGrow: 1 }}>
          <OutlinedInput
            onChange={handleQueryChange}
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            name="itemName"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>

        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sortDir}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </Card>
  );
};

ItemSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  onViewChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc']),
  view: PropTypes.oneOf<View>(['grid', 'list']),
};
