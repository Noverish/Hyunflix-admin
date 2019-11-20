import React, { FC } from 'react';
import { PageHeader } from 'antd';

import { EncodeItem } from 'components';
import withList from 'components/hoc/with-list';
import withPagination from 'components/hoc/with-pagination';
import { Encode } from 'models';
import { encodeList } from 'api';
import { useSearch } from 'hooks';
import { PAGE_SIZE } from 'config';

const isEqual = (v1: Encode, v2: Encode) => v1.id === v2.id;
const EncodeList = withList<Encode>({ isEqual })(EncodeItem);
const EncodeListWithPagination = withPagination(EncodeList);

// let es: EventSource | null = null;

const EncodePage: FC = () => {
  const [searchState, setPage] = useSearch<Encode>(PAGE_SIZE, encodeList, isEqual);
  // const [ exist, setExist ] = useState(false);

  // useEffect(() => {
  //   es = new EventSource('http://home.hyunsub.kim:8600/ffmpeg');
  //   es.onmessage = (event) => {
  //     const status: EncodeStatus = JSON.parse(event.data);
  //     const item = searchState.items.find(v => v.id === status.encodeId);
  //     if (item) {
  //       item.progress = status.progress;
  //       updateItem(item);
  //     }
  //   }

  //   ffmpegExist()
  //     .then(setExist);

  //   return () => {
  //     es && es.close();
  //   }
  // }, []);

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
    <React.Fragment>
      <PageHeader title="인코딩 리스트" />
      <EncodeListWithPagination
        items={searchState.items}
        page={searchState.page}
        pageSize={PAGE_SIZE}
        total={searchState.total}
        loading={searchState.loading}
        onPageChange={setPage}
      />
    </React.Fragment>
  );
};

export default EncodePage;
