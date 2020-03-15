import React from 'react';
import { Checkbox } from 'antd';
import { FolderOutlined, FileOutlined } from '@ant-design/icons';

import withList, { InjectedProps } from 'src/components/hoc/with-list';
import { File, isEqualFile } from 'src/models';

export const FileItem: React.FunctionComponent<InjectedProps<File>> = (props) => {
  const { item, checked } = props;
  const Icon = item.isdir ? FolderOutlined : FileOutlined;

  return (
    <>
      {checked !== undefined && <Checkbox checked={checked} style={{ marginRight: '8px' }} />}
      <Icon style={{ marginRight: '8px' }} />
      <span style={{ marginRight: 'auto' }}>{item.name}</span>
      <div>{item.size}</div>
    </>
  );
};

export const FileList = withList<File>({ isEqual: isEqualFile })(FileItem);
