/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMounted } from "@/shared/hooks/use-mounted";
import type { ChangeEvent, MouseEvent } from 'react';
import type { SortDir } from "@/shared/types/sort";
import { useUserStore } from "@/modules/auth/store/auth";
import type { Group } from "../types/group";
import { useGetGroups } from "../hook/use-get-groups";

interface Filters {
  query?: string;
}

interface ItemsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

export const useGroupsSearch = () => {
  const [state, setState] = useState<ItemsSearchState>({
    filters: {
      query: undefined,
    },
    page: 0,
    rowsPerPage: 9,
    sortBy: 'name',
    sortDir: 'asc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sortDir: SortDir): void => {
    setState((prevState) => ({
      ...prevState,
      sortDir,
    }));
  }, []);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [],
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [],
  );

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

interface ItemsStoreState {
  items: Group[];
  itemsCount: number;
}

export const useGroupsStore = (subject_id: string, searchState: ItemsSearchState) => {
  const { user } = useUserStore();
  const { data, isLoading, isFetched } = useGetGroups({
    user_id: user?.info.id as string,
    subject_id: subject_id as string,
  });
  const [state, setState] = useState<ItemsStoreState>({
    items: [],
    itemsCount: 0,
  });

  // const handleItemsGet = useCallback(async () => {
  //   await refetch();
  //   if (isMounted()) {
  //     setState({
  //       items: data?.subjects as Subject[],
  //       itemsCount: data?.subjects?.length as number,
  //     });
  //   }
  // }, [isMounted]);
  const sortItem = (data: Group[]) => {
    let sortedItems = [...data];
    sortedItems.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {

        return searchState.sortDir === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return searchState.sortDir === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedItems
  }
  useEffect(
    () => {

      if (data?.groups) {

        let sortedItems = sortItem(data.groups)

        setState({
          items: sortedItems,
          itemsCount: data.groups.length,
        });
      }
    },
    [data, searchState.sortDir],

  );

  useEffect(
    () => {

      if (searchState.filters.query && searchState.filters.query !== "") {
        let keyword = searchState.filters.query as string
        const sortedItem = sortItem(data?.groups || [])
        const searchItem = sortedItem.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())) || []
        setState({
          items: searchItem,
          itemsCount: searchItem.length
        })
      } else {
        const sortedItem = sortItem(data?.groups || [])
        setState({
          items: sortedItem,
          itemsCount: sortedItem.length
        })
      }

    },
    [searchState.filters],

  );

  const handleDelete = useCallback((itemId: string): void => {
    setState((prevState) => {
      return {
        ...prevState,
        items: prevState.items.filter((item) => item.id !== itemId),
      };
    });
  }, []);

  return {
    handleDelete,
    ...state,
    itemLoading: isLoading,
    itemFetched: isFetched
  };
};

export const useCurrentItem = (
  items: Group[],
  itemId?: string,
): Group | undefined => {
  return useMemo((): Group | undefined => {
    if (!itemId) {
      return undefined;
    }

    return items.find((item) => item.id === itemId);
  }, [items, itemId]);
};