import {  useCallback, useEffect, useMemo, useState } from "react";
import { Subject } from "../types/subject";
import { useMounted } from "@/shared/hooks/use-mounted";
import type { ChangeEvent, MouseEvent } from 'react';
import { SortDir } from "@/shared/types/sort";


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
        sortBy: 'createdAt',
        sortDir: 'desc',
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
    const isMounted = useMounted();
    const [state, setState] = useState<ItemsStoreState>({
        items: [],
        itemsCount: 0,
    });

    const handleItemsGet = useCallback(async () => { }, [searchState, isMounted]);

    useEffect(
        () => {
            handleItemsGet();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchState],
    );

    const handleDelete = useCallback((itemId: string): void => {
        // api call should be made here, then get the list again
        setState((prevState) => {
            return {
                ...prevState,
                items: prevState.items.filter((item) => item.id !== itemId),
            };
        });
    }, []);

    const handleFavorite = useCallback((itemId: string, value: boolean): void => {
        setState((prevState) => {
            return {
                ...prevState,
                items: prevState.items.map((item) => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            isFavorite: value,
                        };
                    }

                    return item;
                }),
            };
        });
    }, []);

    return {
        handleDelete,
        handleFavorite,
        ...state,
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