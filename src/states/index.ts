import { StateType } from 'typesafe-actions';

import reducer from './reducer';

export type RootState = StateType<typeof reducer>;
export { default as store } from './store';
