import React, { FC, useEffect, useCallback } from 'react';
import { PageHeader } from 'antd';

import { EncodeListWithPagination } from 'src/components';
import { Encode, EncodeStatus } from 'src/models';
import { encodeList } from 'src/api';
import { useSearch } from 'src/hooks';
import { PAGE_SIZE } from 'src/config';

let es: EventSource | null = null;

const EncodePage: FC = () => {
  const [searchState, setSearchState] = useSearch<Encode>(PAGE_SIZE, encodeList);

  const setPage = useCallback((page) => {
    setSearchState(state => ({ ...state, page }));
  }, [setSearchState]);

  const updateItem = useCallback((status) => {
    setSearchState((state) => {
      const { items } = state;
      const index = items.findIndex(v => v.id === status.encodeId);
      if (index >= 0) {
        items[index].progress = status.progress;
        return { ...state, items: [...items] };
      }
      return state;
    });
  }, [setSearchState]);

  useEffect(() => {
    es = new EventSource('http://home.hyunsub.kim:8600/ffmpeg');
    es.onmessage = (event) => {
      const status: EncodeStatus = JSON.parse(event.data);
      updateItem(status);
    };

    // ffmpegExist()
    //   .then(setExist);

    return () => {
      es?.close();
    };
  }, [setSearchState, updateItem]);

  // let headerExtra = <div />
  // switch (state) {
  //   case -1: {
  //     headerExtra = <Button icon="right-circle">Create Process</Button>
  //     break;
  //   }
  //   case 0: {
  //     headerExtra = <Button icon="caret-right">Resume Process</Button>
  //     break;
  //   }
  //   case 1: {
  //     headerExtra = <Button icon="pause">Pause Process</Button>
  //     break;
  //   }
  // }

  // const isExist = (exist)
  //   ? <Tag color="green">프로세스 있음</Tag>
  //   : <Tag color="red">프로세스 없음</Tag>

  return (
    <>
      <PageHeader title="인코딩 리스트" />
      <EncodeListWithPagination
        items={searchState.items}
        page={searchState.page}
        pageSize={PAGE_SIZE}
        total={searchState.total}
        loading={searchState.loading}
        onPageChange={setPage}
      />
    </>
  );
};

export default EncodePage;
