import React, { useState, useCallback, useMemo } from 'react';
import { PageHeader, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { setVideoChecklistAction } from 'states/video';
import { RootState } from 'states';
import { VideoListWithPagination } from 'components';
import { Video, isEqualVideo } from 'models';
import { videoList } from 'api';
import { useSearch } from 'hooks';
import { PAGE_SIZE } from 'config';

interface Props extends RouteComponentProps {
  setChecklist: typeof setVideoChecklistAction;
  checklist: Video[];
}

const VideoPage: React.FC<Props> = (props) => {
  const { checklist, setChecklist } = props;
  const [searchState, setSearchState] = useSearch<Video>(PAGE_SIZE, videoList);
  const [checkable, setCheckable] = useState(false);

  // functions
  const onItemCheck = useCallback((video: Video) => {
    const isChecked = checklist.some(v => isEqualVideo(v, video));

    setChecklist(isChecked
      ? checklist.filter(v => !isEqualVideo(v, video))
      : [...checklist, video]);
  }, [checklist, setChecklist]);

  const setPage = useCallback((page) => {
    setSearchState(state => ({ ...state, page }));
  }, [setSearchState]);

  const goToVideoEditPage = useCallback(() => {
    props.history.push('/video/edit-title');
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
      <Button onClick={goToVideoEditPage} disabled={checklist.length === 0}>Edit</Button>
      <Button onClick={clearChecklist} disabled={checklist.length === 0}>Clear Checklist</Button>
      <Button type="danger" onClick={setCheckable.bind(null, false)}>Cancel</Button>
    </>
  ) : (
    <Button onClick={setCheckable.bind(null, true)}>Select</Button>
  )), [checkable, checklist.length, goToVideoEditPage, clearChecklist]);

  return (
    <>
      <PageHeader title="Video List" extra={headerExtra} />
      <VideoListWithPagination
        items={searchState.items}
        page={searchState.page}
        pageSize={PAGE_SIZE}
        total={searchState.total}
        loading={searchState.loading}
        onPageChange={setPage}
        onItemClick={checkable ? onItemCheck : undefined}
        checklist={checkable ? checklist : undefined}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  checklist: state.video.checklist,
});

const mapDispatchToProps = {
  setChecklist: setVideoChecklistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
