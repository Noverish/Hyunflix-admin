import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, Button, Breadcrumb, Icon } from 'antd';

import * as Api from 'api';
import { File } from 'models';
import { FileItem, EncodeModal } from 'components';
import withList from 'components/hoc/with-list';

const isEqual = (v1: File, v2: File) => v1.path === v2.path;
const FileList = withList<File>({ isEqual })(FileItem);

const renderBreadcrumb = (path: string) => {
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

const ExplorerPage: FC<RouteComponentProps> = (props) => {
  const [files, setFiles] = useState([] as File[]);
  const [loading, setLoading] = useState(false);
  const [checkable, setCheckable] = useState(false);
  const [checklist, setChecklist] = useState([] as File[]);
  const [encodeModalVisible, setEncodeModalVisible] = useState(false);

  const path = '/' + (props.match.params['path'] || '');

  useEffect(() => {
    setLoading(true);
    Api.readdir(path)
      .then(setFiles)
      .then(() => setLoading(false));
  }, [path]);

  const onItemClick = (file: File) => {
    if (checkable) {
      const isChecked = checklist.some(f => isEqual(f, file));
      if (isChecked) {
        setChecklist(checklist.filter(f => !isEqual(f, file)));
      } else {
        setChecklist([...checklist, file]);
      }
    } else {
      props.history.push('/explorer' + file.path);
    }
  };

  const headerExtra = checkable ? (
    <React.Fragment>
      <Button onClick={setEncodeModalVisible.bind(null, true)} disabled={checklist.length === 0}>Encode</Button>
      <Button type="danger" onClick={setCheckable.bind(null, false)}>Cancel</Button>
    </React.Fragment>
  ) : (
    <Button type="primary" onClick={setCheckable.bind(null, true)}>Select</Button>
  );

  return (
    <React.Fragment>
      <PageHeader title={renderBreadcrumb(path)} extra={headerExtra} />
      <FileList
        items={files}
        onItemClick={onItemClick}
        loading={loading}
        checklist={checkable ? checklist : undefined}
      />
      <EncodeModal visible={encodeModalVisible} onDismiss={setEncodeModalVisible.bind(null, false)} files={checklist}/>
    </React.Fragment>
  );
};

export default ExplorerPage;
