import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import EncodePage from './encode/encode';
import EncodeAddPage from './encode/encode-add';
import AdminLayout from './admin-layout';

const AdminPage: React.FunctionComponent = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/encode/add" component={EncodeAddPage} />
        <Route path="/admin/encode" component={EncodePage} />
        <Route><Redirect to="/admin/encode" /></Route>
      </Switch>
    </AdminLayout>
  );
};

export default AdminPage;
