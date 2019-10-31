import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import EncodePage from './encode/encode';
import EncodeAddPage from './encode/encode-add';
import VideoManagePage from './video/video-manage';
import VideoArticleEditPage from './video/video-article-edit';
import VideoExaminePage from './video/video-examine';
import MusicExaminePage from './music/music-examine';
import MusicManagePage from './music/music-manage';
import AdminLayout from './admin-layout';

const AdminPage: React.FunctionComponent = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/encode/add" component={EncodeAddPage} />
        <Route path="/admin/encode" component={EncodePage} />
        <Route path="/admin/video/manage/edit" component={VideoArticleEditPage} />
        <Route path="/admin/video/manage" component={VideoManagePage} />
        <Route path="/admin/video/examine" component={VideoExaminePage} />
        <Route path="/admin/music/manage" component={MusicManagePage} />
        <Route path="/admin/music/examine" component={MusicExaminePage} />
        <Route><Redirect to="/admin/encode" /></Route>
      </Switch>
    </AdminLayout>
  );
};

export default AdminPage;
