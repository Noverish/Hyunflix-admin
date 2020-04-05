import React, { useCallback, useMemo } from 'react';
import { PageHeader, Input } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';

interface Props extends PageHeaderProps {
  query?: string;
  onQueryChange?(query: string): void;
}

export default ({ query, onQueryChange, extra, ...restProps }: Props) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange?.(e.target.value);
  }, [onQueryChange]);

  const headerExtra = useMemo(() => {
    if (query !== undefined && onChange !== undefined) {
      return (
        <>
          <Input.Search onChange={onChange} defaultValue={query} />
          {extra}
        </>
      );
    }
    return extra;
  }, [onChange, query, extra]);

  return (
    <PageHeader
      extra={headerExtra}
      {...restProps}
    />
  );
};
