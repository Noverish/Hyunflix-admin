import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { SearchResult } from 'api';

export interface SearchState<T> {
  total: number;
  items: T[];
  page: number;
  loading: boolean;
}

export type Result<T> = [SearchState<T>, Dispatch<SetStateAction<SearchState<T>>>];

export const useSearch = <T>(pageSize: number, search: (page: number, pageSize: number) => Promise<SearchResult<T>>): Result<T> => {
  const [state, setState] = useState({
    total: 0,
    items: [],
    page: 1,
    loading: false,
  } as SearchState<T>);

  const { page } = state;

  useEffect(() => {
    setState(state => ({ ...state, loading: true }));

    search(page, pageSize)
      .then((result: SearchResult<T>) => {
        setState({
          page,
          total: result.total,
          items: result.results,
          loading: false,
        });
      });
  }, [pageSize, search, page]);

  return [state, setState];
};
