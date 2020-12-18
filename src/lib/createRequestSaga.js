// 유틸 함수 createRequestSaga 
import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

//유틸 함수를 사용하여 modules/auth.js 리덕스 모듈에서 API를 사용할 수 있도록 구현할 것이다./
export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
      yield put(startLoading(type)); //로딩 시작
      try{
        const response = yield call(request, action.payload);
        yield put({
          type: SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        yield put({
          type: FAILURE,
          payload:e,
          error: true,
        });
      }
      yield put(finishLoading(type)); // 로딩 끝
    };
}