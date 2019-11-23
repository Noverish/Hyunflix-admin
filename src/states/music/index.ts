import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { Music } from 'models';

// Actions
export const setMusicChecklistAction = createAction('SET_MUSIC_CHECKLIST')<Music[]>();

type Action = ActionType<typeof setMusicChecklistAction>;

// Reducers
const checklist = createReducer<Music[], Action>([])
  .handleAction(setMusicChecklistAction, (_, action) => action.payload);

export const reducer = combineReducers({
  checklist,
});
