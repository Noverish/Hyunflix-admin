import { all } from 'redux-saga/effects';

import { saga as auth } from './auth';

export default function* () {
  yield all([
    ...auth,
  ]);
}
