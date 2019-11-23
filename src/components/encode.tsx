import React from 'react';
import { Tag, Progress } from 'antd';
import { basename } from 'path';

import withList, { InjectedProps } from 'components/hoc/with-list';
import withPagination from 'components/hoc/with-pagination';
import { Encode, isEqualEncode } from 'models';

export const EncodeItem: React.FC<InjectedProps<Encode>> = (props) => {
  const { item } = props;
  const progress = parseFloat(item.progress.toFixed(2));
  const progressStatus = (progress < 0) ? 'exception' : undefined;

  return (
    <React.Fragment>
      <span style={{ marginRight: '8px' }}>{item.id}</span>
      <span style={{ marginRight: 'auto' }}>{basename(item.inpath)}</span>
      {progress2tag(item.progress)}
      <Progress percent={progress} size="small" status={progressStatus} style={{ width: '100px', marginRight: '16px' }}/>
      <span>{item.date}</span>
    </React.Fragment>
  );
};

function progress2tag(progress: number): React.ReactElement {
  if (progress === 0.0) {
    return <Tag className="status" color="orange">queued</Tag>;
  } else if (progress < 0.0) {
    return <Tag className="status" color="red">failed</Tag>;
  } else if (progress >= 100.0) {
    return <Tag className="status" color="green">done</Tag>;
  } else {
    return <Tag className="status" color="cyan">processing</Tag>;
  }
}

export const EncodeList = withList<Encode>({ isEqual: isEqualEncode })(EncodeItem);
export const EncodeListWithPagination = withPagination(EncodeList);
