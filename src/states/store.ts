import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import saga from './saga';
import { RootState } from '.';

const tmp = localStorage.getItem('redux');
const persistedState: RootState | {} = tmp ? JSON.parse(tmp) : {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(saga);

export default store;

store.subscribe(() => {
  localStorage.setItem('redux', JSON.stringify(store.getState()));
});
