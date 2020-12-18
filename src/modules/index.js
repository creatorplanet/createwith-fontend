//루트 리듀서를 만든다

import {combineReducers} from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
//프로젝트의 rootSaga를 만들어준다
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
});

//프로젝트의 rootSaga 
export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;