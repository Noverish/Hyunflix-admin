import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from 'pages/login/login';
import IndexPage from 'pages';
import { RootState } from 'states';

import 'antd/dist/antd.css';

interface Props {
  sessionId: string;
}

const App: React.FC<Props> = (props) => {
  const inner = (props.sessionId)
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
  sessionId: state.auth.sessionId,
});

export default connect(mapStateToProps)(App);
