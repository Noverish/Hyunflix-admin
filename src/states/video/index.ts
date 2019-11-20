import { createAsyncAction, createReducer, getType, ActionType } from 'typesafe-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import * as Api from 'api';
import { COLORS } from 'config';

// Actions
export const videoTagAction = createAsyncAction(
  'VIDEO_TAG_REQUEST',
  'VIDEO_TAG_SUCCESS',
  'VIDEO_TAG_FAILURE',
)<undefined, string[], string>();

type VideoAction = ActionType<typeof videoTagAction>;

// Reducers
const tags = createReducer<Map<string, string>, VideoAction>(new Map())
  .handleAction(videoTagAction.success, (_, action: ReturnType<typeof videoTagAction.success>) => {
    const map = new Map<string, string>();
    const tags: string[] = action.payload;

    tags.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

export const reducer = combineReducers({
  tags,
});

// Sagas
function* fetchVideoTag(action: ReturnType<typeof videoTagAction.request>) {
  try {
    const result: string[] = yield call([Api, 'videoTagList']);
    yield put(videoTagAction.success(result));
  } catch (errMsg) {
    yield put(videoTagAction.failure(errMsg));
  }
}

function* watchVideoTag() {
  yield takeEvery(getType(videoTagAction.request), fetchVideoTag);
}

export const saga = [
  watchVideoTag(),
];
