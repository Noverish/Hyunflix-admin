import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { File } from 'src/models';

// Actions
export const setChecklistAction = createAction('SET_CHECKLIST')<File[]>();

type Action = ActionType<typeof setChecklistAction>;

// Reducers
const checklist = createReducer<File[], Action>([])
  .handleAction(setChecklistAction, (_, action) => action.payload);

export const reducer = combineReducers({
  checklist,
});
