/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Subject } from "../types/subject";
import { useMounted } from "@/shared/hooks/use-mounted";
import type { ChangeEvent, MouseEvent } from 'react';
import type { SortDir } from "@/shared/types/sort";
import { useGetSubjects } from "../hook/use-get-subjects";
import { useUserStore } from "@/modules/auth/store/auth";

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
  items: Subject[];
  itemsCount: number;
}

export const useItemsStore = (searchState: ItemsSearchState) => {
  const { user } = useUserStore();
  const { data, isLoading, refetch, error } = useGetSubjects({ user_id: user?.info.id as string });
  const isMounted = useMounted();
  const [state, setState] = useState<ItemsStoreState>({
    items: [],
    itemsCount: 0,
  });

  const handleItemsGet = useCallback(async () => {
    await refetch();
    if (isMounted()) {
      setState({
        items: data?.subjects as Subject[],
        itemsCount: data?.subjects?.length as number,
      });
    }
  }, [isMounted]);

  useEffect(
    () => {
      if (data?.subjects) {
        let sortedItems = [...data.subjects];

        // เรียงลำดับตามชื่อ (name)
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

        setState({
          items: sortedItems,
          itemsCount: data.subjects.length,
        });
      }
    },
    [data, searchState.sortDir],
  );

  useEffect(
    () => {
      setState({
        items: data?.subjects as Subject[],
        itemsCount: data?.subjects?.length as number,
      });
    },
    [data],
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