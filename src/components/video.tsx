import React from 'react';
import { Checkbox, Tag } from 'antd';

import withList, { InjectedProps } from 'src/components/hoc/with-list';
import withPagination from 'src/components/hoc/with-pagination';
import { Video, isEqualVideo } from 'src/models';

export const VideoItem: React.FC<InjectedProps<Video>> = (props) => {
  const { item, checked } = props;

  return (
    <>
      {checked !== undefined && <Checkbox checked={checked} />}
      <span>{item.id}</span>
      <Tag>{item.tags}</Tag>
      <span style={{ marginRight: 'auto' }}>{item.title}</span>
      <span>{item.durationString}</span>
      <Tag>{item.resolution}</Tag>
      <span>{item.date}</span>
    </>
  );
};

export const VideoList = withList<Video>({ isEqual: isEqualVideo })(VideoItem);
export const VideoListWithPagination = withPagination(VideoList);
