import React, { ComponentType, FC } from 'react';
import { Pagination } from 'antd';

export interface ExternalProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange(page: number): void;
}

function withPagination<OriginalProps extends {}>(Component: ComponentType<OriginalProps>) {
  const HOCPagination: FC<OriginalProps & ExternalProps> = (props) => {
    const { total, page, pageSize, onPageChange } = props;

    return (
      <>
        <Component {...props} />
        <Pagination current={page} total={total} pageSize={pageSize} onChange={onPageChange} />
      </>
    );
  };

  return HOCPagination;
}

export default withPagination;
