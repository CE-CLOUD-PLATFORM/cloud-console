/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useUserStore } from "@/modules/auth/store/auth";
import type { SortDir } from "@/shared/types/sort";
import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetSubjects } from "../hook/use-get-subjects";
import type { Subject } from "../types/subject";

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

export const useItemsSearch = () => {
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
      page: 0, // Reset to first page when filters change
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
        page: 0, // Reset to first page when rows per page changes
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
  items: Subject[];
  itemsCount: number;
}

export const useItemsStore = (searchState?: ItemsSearchState) => {
  const { user } = useUserStore();
  const { data, isLoading, isFetched } = useGetSubjects({ user_id: user?.info.id as string });
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
  const sortItem = (data: Subject[]) => {
    let sortedItems = [...data];
    sortedItems.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return searchState?.sortDir === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return searchState?.sortDir === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedItems;
  }

  const getPaginatedItems = (allItems: Subject[]) => {
    const startIndex = (searchState?.page || 0) * (searchState?.rowsPerPage || 9);
    const endIndex = startIndex + (searchState?.rowsPerPage || 9);
    return allItems.slice(startIndex, endIndex);
  }

  useEffect(
    () => {
      if (data?.subjects) {
        let sortedItems = sortItem(data.subjects);
        let paginatedItems = getPaginatedItems(sortedItems);

        setState({
          items: paginatedItems,
          itemsCount:sortItem.length,
        });
      }
    },
    [data, searchState?.sortDir, searchState?.page, searchState?.rowsPerPage],
  );

  useEffect(
    () => {
      if (searchState?.filters.query && searchState.filters.query !== "") {
        let keyword = searchState.filters.query as string;
        const sortedItem = sortItem(data?.subjects || []);
        const searchItem = sortedItem.filter(item =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        ) || [];
        const paginatedSearchItems = getPaginatedItems(searchItem);

        setState({
          items: paginatedSearchItems,
          itemsCount: searchItem.length
        });
      } else {
        const sortedItem = sortItem(data?.subjects || []);
        const paginatedItems = getPaginatedItems(sortedItem);

        setState({
          items: paginatedItems,
          itemsCount: sortedItem.length
        });
      }
    },
    [searchState?.filters, searchState?.page, searchState?.rowsPerPage],
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
    itemFetched: isFetched,
    subjectIdNames: data?.subjects.map((item) => ({ id: item.id, name: item.name })) || [],
  };
};

export const useCurrentItem = (
  items: Subject[],
  itemId?: string,
): Subject | undefined => {
  return useMemo((): Subject | undefined => {
    if (!itemId) {
      return undefined;
    }

    return items.find((item) => item.id === itemId);
  }, [items, itemId]);
};