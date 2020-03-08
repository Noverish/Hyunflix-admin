import { createAsyncAction, createReducer, getType, ActionType } from 'typesafe-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import * as Api from 'api';
import { LoginResult } from 'models';

// Actions
export const loginAction = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
)<string, LoginResult, string>();

type AuthAction = ActionType<typeof loginAction>;

// Reducers
const accessToken = createReducer<string, AuthAction>('')
  .handleAction(loginAction.success, (_, action) => action.payload.accessToken);

const refreshToken = createReducer<string, AuthAction>('')
  .handleAction(loginAction.success, (_, action) => action.payload.refreshToken);

export const reducer = combineReducers({
  accessToken,
  refreshToken,
});

// Sagas
function* fetchLogin(action: ReturnType<typeof loginAction.request>) {
  try {
    const result: LoginResult = yield call([Api, 'login'], action.payload);
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
