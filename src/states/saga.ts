import { all } from 'redux-saga/effects';

import { saga as auth } from './auth';
import { saga as music } from './music';
import { saga as video } from './video';

export default function* () {
  yield all([
    ...auth,
    ...music,
    ...video,
  ]);
}
