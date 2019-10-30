import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from 'pages/login/login';
import AdminLayout from 'pages/admin-layout';
import { RootState } from 'states';

import 'antd/dist/antd.css';

interface Props {
  token: string;
}

const App: React.FC<Props> = (props) => {
  const inner = (props.token)
    ? (
      <Switch>
        <Route component={AdminLayout} />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route><Redirect to="/login" /></Route>
      </Switch>
    );

  return (
    <BrowserRouter>
      {inner}
    </BrowserRouter>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(App);
