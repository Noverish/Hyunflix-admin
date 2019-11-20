import { createAsyncAction, createReducer, getType, ActionType } from 'typesafe-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import * as Api from 'api';
import { COLORS } from 'config';

// Actions
export const musicTagAction = createAsyncAction(
  'MUSIC_TAG_REQUEST',
  'MUSIC_TAG_SUCCESS',
  'MUSIC_TAG_FAILURE',
)<undefined, string[], string>();

type MusicAction = ActionType<typeof musicTagAction>;

// Reducers
const tags = createReducer<Map<string, string>, MusicAction>(new Map())
  .handleAction(musicTagAction.success, (_, action: ReturnType<typeof musicTagAction.success>) => {
    const map = new Map<string, string>();
    const tags: string[] = action.payload;

    tags.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

export const reducer = combineReducers({
  tags,
});

// Sagas
function* fetchMusicTag(action: ReturnType<typeof musicTagAction.request>) {
  try {
    const result: string[] = yield call([Api, 'musicTagList']);
    yield put(musicTagAction.success(result));
  } catch (errMsg) {
    yield put(musicTagAction.failure(errMsg));
  }
}

function* watchMusicTag() {
  yield takeEvery(getType(musicTagAction.request), fetchMusicTag);
}

export const saga = [
  watchMusicTag(),
];
