import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import saga from './saga';
import { RootState } from '.';

const token = localStorage.getItem('token');
const preloadedState: RootState | undefined = token ? { auth: { token } } : undefined;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(saga);

export default store;

store.subscribe(() => {
  localStorage.setItem('token', store.getState().auth.token);
});
