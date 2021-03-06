import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from 'src/pages/login/login';
import IndexPage from 'src/pages';
import { RootState } from 'src/states';

import 'antd/dist/antd.css';

interface Props {
  refreshToken: string;
}

const App: React.FC<Props> = (props) => {
  const inner = (props.refreshToken)
    ? (
      <Route component={IndexPage} />
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
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps)(App);
