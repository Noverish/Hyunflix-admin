import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { PageHeader, Button, Breadcrumb } from 'antd';
import { connect } from 'react-redux';

import * as Api from 'api';
import { RootState } from 'states';
import { setChecklistAction } from 'states/file';
import { File, isEqualFile } from 'models';
import { FileList } from 'components';

const renderBreadcrumb = (path: string) => {
  const comps = path.match(/[^/]+/g) || [];

  const items = comps.map((p, i) => {
    const path = comps.slice(0, i + 1).join('/');
    return (
      <Breadcrumb.Item key={p}>
        <Link to={`/explorer/${path}`}>{p}</Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb>
      <Breadcrumb.Item><Link to="/explorer">Home</Link></Breadcrumb.Item>
      {items}
    </Breadcrumb>
  );
};

interface Props extends RouteComponentProps {
  setChecklist: typeof setChecklistAction;
  checklist: File[];
}

const ExplorerPage: FC<Props> = (props) => {
  const [files, setFiles] = useState([] as File[]);
  const [loading, setLoading] = useState(false);
  const [checkable, setCheckable] = useState(false);
  const { checklist, setChecklist } = props;

  const path = `/${props.match.params['path'] || ''}`;

  useEffect(() => {
    setLoading(true);
    Api.readdir(path)
      .then(setFiles)
      .then(() => setLoading(false));
  }, [path]);

  // functions
  const onItemClick = useCallback((file: File) => {
    props.history.push(`/explorer${file.path}`);
  }, [props.history]);

  const onItemCheck = useCallback((file: File) => {
    const isChecked = checklist.some(f => isEqualFile(f, file));

    setChecklist(isChecked
      ? checklist.filter(f => !isEqualFile(f, file))
      : [...checklist, file]);
  }, [checklist, setChecklist]);

  const goToEncodeAddPage = useCallback(() => {
    props.history.push('/encode/add');
  }, [props.history]);

  const goToVideoAddPage = useCallback(() => {
    props.history.push('/video/add');
  }, [props.history]);

  const clearChecklist = useCallback(() => {
    setChecklist([]);
  }, [setChecklist]);

  // components
  const headerExtra = useMemo(() => (checkable ? (
    <>
      <span>
        {checklist.length}
        개 선택됨
      </span>
      <Button onClick={goToEncodeAddPage} disabled={checklist.length === 0}>Encode</Button>
      <Button onClick={goToVideoAddPage} disabled={checklist.length === 0}>Add Video</Button>
      <Button onClick={clearChecklist} disabled={checklist.length === 0}>Clear Checklist</Button>
      <Button type="danger" onClick={setCheckable.bind(null, false)}>Cancel</Button>
    </>
  ) : (
    <Button onClick={setCheckable.bind(null, true)}>Select</Button>
  )), [checkable, checklist.length, goToVideoAddPage, goToEncodeAddPage, clearChecklist]);

  const breadcrumb = useMemo(() => renderBreadcrumb(path), [path]);

  return (
    <>
      <PageHeader title={breadcrumb} extra={headerExtra} />
      <FileList
        items={files}
        onItemClick={checkable ? onItemCheck : onItemClick}
        loading={loading}
        checklist={checkable ? checklist : undefined}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  checklist: state.file.checklist,
});

const mapDispatchToProps = {
  setChecklist: setChecklistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerPage);
