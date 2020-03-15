import React from 'react';
import { Checkbox, Icon } from 'antd';

import withList, { InjectedProps } from 'src/components/hoc/with-list';
import { File, isEqualFile } from 'src/models';

export const FileItem: React.FunctionComponent<InjectedProps<File>> = (props) => {
  const { item, checked } = props;
  const iconType = item.isdir ? 'folder' : 'file';

  return (
    <>
      {checked !== undefined && <Checkbox checked={checked} style={{ marginRight: '8px' }} />}
      <Icon type={iconType} style={{ marginRight: '8px' }} />
      <span style={{ marginRight: 'auto' }}>{item.name}</span>
      <div>{item.size}</div>
    </>
  );
};

export const FileList = withList<File>({ isEqual: isEqualFile })(FileItem);
