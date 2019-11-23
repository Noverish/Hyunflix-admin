import React from 'react';
import { Checkbox, Icon } from 'antd';

import withList, { InjectedProps } from 'components/hoc/with-list';
import { File, isEqualFile } from 'models';

export const FileItem: React.FunctionComponent<InjectedProps<File>> = (props) => {
  const { item, checked } = props;
  const iconType = item.isdir ? 'folder' : 'file';

  return (
    <React.Fragment>
      {checked !== undefined && <Checkbox checked={checked} style={{ marginRight: '8px' }} />}
      <Icon type={iconType} style={{ marginRight: '8px' }}/>
      <span style={{ marginRight: 'auto' }}>{item.name}</span>
      <div>{item.size}</div>
    </React.Fragment>
  );
};

export const FileList = withList<File>({ isEqual: isEqualFile })(FileItem);
