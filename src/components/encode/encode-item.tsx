import React from 'react';
import { Tag, Progress } from 'antd';
import { basename } from 'path';

import { Encode, EncodeStatus } from 'src/models';
import EncodeResultItem from './encode-result-item';

interface Props {
  status?: EncodeStatus;
  item: Encode;
}

export default ({ item, status }: Props) => {
  const progress = parseFloat(item.progress.toFixed(2));

  return (
    <div>
      <div>
        <span style={{ marginRight: '8px' }}>{item.id}</span>
        <span style={{ marginRight: 'auto' }}>{basename(item.inpath)}</span>
        {progress2tag(item.progress)}
        {status && <span>{status.eta}</span>}
        {status && <span>{status.speed}</span>}
        <Progress percent={progress} size="small" style={{ width: '100px', marginRight: '16px' }} />
        <span>{item.date}</span>
      </div>
      {item.before && <EncodeResultItem title="before" item={item.before} />}
      {item.after && <EncodeResultItem title="after" item={item.after} />}
    </div>
  );
};

function progress2tag(progress: number): React.ReactElement {
  if (progress === 0) {
    return <Tag className="status" color="orange">queued</Tag>;
  } if (progress === 100) {
    return <Tag className="status" color="green">done</Tag>;
  }
  return <Tag className="status" color="cyan">processing</Tag>;
}
