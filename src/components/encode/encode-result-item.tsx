import React from 'react';

import { EncodeResult } from 'src/models';

interface Props {
  title: string;
  item: EncodeResult;
}

export default ({ title, item }: Props) => (
  <div>
    <span>{title}</span>
    <span>bitrate: </span>
    <span>{item.bitrate}</span>
    <span>duration: </span>
    <span>{item.duration}</span>
    <span>screen: </span>
    <span>
      {item.width}
      x
      {item.height}
    </span>
    <span>size: </span>
    <span>{item.size}</span>
    <span>date: </span>
    <span>{item.date}</span>
  </div>
);
