import React, { useEffect, useCallback, useState } from 'react';
import { List, Pagination } from 'antd';

import { HeaderWithSearch, EncodeItem } from 'src/components';
import { Encode, EncodeStatus } from 'src/models';
import { encodeList } from 'src/api';
import { useSearch } from 'src/hooks';
import { PAGE_SIZE, ENCODE_SERVER_SSE_PATH } from 'src/config';
import { RouteComponentProps } from 'react-router-dom';

let es: EventSource | null = null;

const EncodePage = ({ history }: RouteComponentProps) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch<Encode>(encodeList, history, PAGE_SIZE);
  const [status, setStatus] = useState(null as EncodeStatus | null);

  useEffect(() => {
    es = new EventSource(ENCODE_SERVER_SSE_PATH);
    es.onmessage = (event) => {
      setStatus(JSON.parse(event.data) as EncodeStatus);
    };

    return () => {
      es?.close();
    };
  }, []);

  const renderItem = useCallback((item: Encode) => {
    const tmp = (item.id === status?.encodeId) ? status : undefined;

    return (
      <List.Item>
        <EncodeItem item={item} status={tmp} />
      </List.Item>
    );
  }, [status]);

  return (
    <>
      <HeaderWithSearch
        title="인코딩 리스트"
        backIcon={false}
        query={query}
        onQueryChange={setQuery}
      />
      <List
        dataSource={items}
        renderItem={renderItem}
        loading={loading}
        bordered
      />
      <Pagination
        current={page}
        total={total}
        pageSize={PAGE_SIZE}
        onChange={setPage}
      />
    </>
  );
};

export default EncodePage;
