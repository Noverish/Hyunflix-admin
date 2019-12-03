import { createAsyncAction, createReducer, getType, ActionType } from 'typesafe-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import * as Api from 'api';
import { setCookie } from 'utils';

// Actions
export const loginAction = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
)<string, string, string>();

type AuthAction = ActionType<typeof loginAction>;

// Reducers
const token = createReducer<string, AuthAction>('')
  .handleAction(loginAction.success, (_, action) => action.payload);

export const reducer = combineReducers({
  token,
});

// Sagas
function* fetchLogin(action: ReturnType<typeof loginAction.request>) {
  try {
    const result: string = yield call([Api, 'login'], action.payload);
    setCookie('x-hyunsub-token', result, 1);
    yield put(loginAction.success(result));
  } catch (errMsg) {
    yield put(loginAction.failure(errMsg));
  }
}

function* watchLogin() {
  yield takeEvery(getType(loginAction.request), fetchLogin);
}

export const saga = [
  watchLogin(),
];
