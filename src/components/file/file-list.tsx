import React from 'react';
import { List, Icon, Breadcrumb, PageHeader } from 'antd';

import { FileItem } from 'components';
import { File } from 'models';

interface Props {
  path: string;
  files: File[];
  onItemClick?(file: File): void;
  onItemLongClick?(file: File): void;
  selectlist?: File[];
  topRight?: React.ReactNode;
}

const renderItem = (props: Props, file: File) => {
  const { selectlist, onItemClick, onItemLongClick } = props;

  const selected = (selectlist !== undefined)
    ? selectlist.some(f => f.path === file.path)
    : undefined;

  return (
    <FileItem
      file={file}
      onClick={onItemClick}
      onLongClick={onItemLongClick}
      selected={selected}
    />
  );
};

const renderBreadcrumb = (props: Props) => {
  const { path } = props;
  const items = path.split('/').map(p => (
    <Breadcrumb.Item key={p}>{p}</Breadcrumb.Item>
  ));

  return (
    <Breadcrumb>
      <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
      {items}
    </Breadcrumb>
  );
};

const FileList: React.FC<Props> = (props) => {
  const { files, topRight } = props;

  return (
    <div className="article-list-page">
      <div className="page-header">
        <PageHeader title={renderBreadcrumb(props)} />
        {topRight}
      </div>
      <List
        className="page-content"
        dataSource={files}
        renderItem={renderItem.bind(null, props)}
      />
    </div>
  );
};

export default FileList;
