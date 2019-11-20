import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import EncodePage from './encode/encode';
import ExplorerPage from './explorer/explorer';
import AdminLayout from './admin-layout';

const IndexRoutes: React.FunctionComponent = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/encode" component={EncodePage} />
        <Route path="/explorer/:path*" component={ExplorerPage} />
        <Route><Redirect to="/encode" /></Route>
      </Switch>
    </AdminLayout>
  );
};

export default IndexRoutes;
