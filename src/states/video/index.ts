import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { Video } from 'models';

// Actions
export const setVideoChecklistAction = createAction('SET_VIDEO_CHECKLIST')<Video[]>();

type Action = ActionType<typeof setVideoChecklistAction>;

// Reducers
const checklist = createReducer<Video[], Action>([])
  .handleAction(setVideoChecklistAction, (_, action) => action.payload);

export const reducer = combineReducers({
  checklist,
});
