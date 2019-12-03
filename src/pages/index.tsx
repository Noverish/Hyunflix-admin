import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import EncodePage from './encode/encode';
import EncodeAddPage from './encode/encode-add';
import ExplorerPage from './explorer/explorer';
import VideoPage from './video/video';
import VideoAddPage from './video/video-add';
import VideoEditTitlePage from './video/video-edit-title';
import YoutubePage from './youtube/youtube';
import AdminLayout from './admin-layout';

const IndexRoutes: React.FunctionComponent = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/encode/add" component={EncodeAddPage} />
        <Route path="/encode" component={EncodePage} />
        <Route path="/explorer/:path*" component={ExplorerPage} />
        <Route path="/video/add" component={VideoAddPage} />
        <Route path="/video/edit-title" component={VideoEditTitlePage} />
        <Route path="/video" component={VideoPage} />
        <Route path="/youtube" component={YoutubePage} />
        <Route><Redirect to="/encode" /></Route>
      </Switch>
    </AdminLayout>
  );
};

export default IndexRoutes;
