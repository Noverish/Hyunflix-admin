import { useState } from 'react';

import { SearchResult } from 'api';

export interface SearchState<T> {
  total: number;
  items: T[];
  page: number;
  loading: boolean;
}

export type Result<T> = [SearchState<T>, (page: number) => void, (item: T) => void];

export const useSearch = <T>(pageSize: number, search: (page: number, pageSize: number) => Promise<SearchResult<T>>, inEqual: (v1: T, v2: T) => boolean): Result<T> => {
  const [state, setState] = useState({
    total: 0,
    items: [],
    page: 1,
    loading: false,
  } as SearchState<T>);

  const setPage = (page: number) => {
    setState({ ...state, loading: true });

    search(page, pageSize)
      .then((result: SearchResult<T>) => {
        setState({
          page,
          total: result.total,
          items: result.results,
          loading: false,
        });
      });
  };

  const updateItem = (item: T) => {
    const items = state.items;
    const index = items.findIndex(v => inEqual(v, item));
    items[index] = item;
    setState({ ...state, items });
  };

  return [state, setPage, updateItem];
};
