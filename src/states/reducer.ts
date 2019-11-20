import { combineReducers } from 'redux';

import { reducer as auth } from './auth';
import { reducer as music } from './music';
import { reducer as video } from './video';

export default combineReducers({
  auth,
  music,
  video,
});
