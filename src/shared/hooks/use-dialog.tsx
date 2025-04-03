/* eslint-disable no-unused-vars */
'use client';

import { useCallback, useState } from 'react';

interface DialogController<T> {
  data?: T;
  handleClose: () => void;
  handleOpen: (data?: T) => void;
  handleMutating: (val: boolean) => void;
  open: boolean;
}

export function useDialog<T = unknown>(): DialogController<T> {
  const [state, setState] = useState<{
    open: boolean;
    data?: T;
    mutating?: boolean;
  }>({
    open: false,
    data: undefined,
    mutating: false,
  });

  const handleOpen = useCallback((data?: T): void => {
    setState({
      open: true,
      data,
    });
  }, []);

  const handleClose = useCallback((): void => {
    setState({
      open: false,
    });
  }, []);
  const handleMutating = useCallback((val?: boolean): void => {
    setState((state) => ({
      ...state,
      mutating: val,
    }));
  }, []);
  return {
    data: state.data,
    handleClose,
    handleOpen,
    handleMutating,
    open: state.open,
  };
}
