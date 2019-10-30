import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from 'pages/login/login';
import AdminLayout from 'pages/admin-layout';

import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route component={AdminLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
