// 추후 비동기 작업을 관리하는 과정에서 redux-saga를 쓸 텐데, 당장은 미들웨어에 대한 관심은 접어 둔 채 
//리덕스 스토어를 생성하고 Provider 컴포넌트를 통해 프로젝드에 리덕스를 적용하는 과정만 다루도록 하겠다. 
//* 프로젝트에 리덕스를 적용하기 위해 store를 만듭니다
// 한 개의 프로젝트는 단 하나의 store만 가질 수 있습니다. store안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 지닙니다. 
//리덕스랑 리액트 상태 관리 라이브러리 이다. 

//리듀서의 틀을 만든다 
// reducer란?  변화를 일으키는 함수이다. 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 옵니다.
// 그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 줍니다. 

//리덕스 모듈을 만든다. 이 프로젝트에서 Ducks 패턴을 사용하여 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의 되어 있는 리덕스 모듈을 작성할 것이다.
import { createAction, handleActions } from 'redux-actions';
//immer의 역할 : 리덕스를 사용하는 데 immer 라이브러리가 꼭 필요하지는 않지만
// immer를 사용하여 불변성을 좀 더 편하게 관리하고자 한다. (만약, immer없이 spread 연산자를 활용하여 불변성을 관리하는 것이 더 편하다면 굳이 사용하지 않아도 된다.)
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
// createRequestSaga를 통해 각 API를 위한 saga를 생성하고, 액션 생성 함수와 reducer도 구현한다
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

//const SAMPLE_ACTION = 'auth/SAMPLE_ACTION'; 
const CHANGE_FIELD ='auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

//createRequestSaga>createRequestActionTypes 유틸 함수 사용
const [ SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

const [ LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

 
//export const sampleAction = createAction(SAMPLE_ACTION);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // signup, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
); 

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // signup/login

export const signup = createAction(SIGNUP, ({ username, password }) => ({
  username,
  password,
}));
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

//saga 생성
const signupSaga = createRequestSaga( SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga( LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest( SIGNUP, signupSaga);
  yield takeLatest( LOGIN, loginSaga);
}

//const initialState = {};
const initialState = {
  signup: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
      username: '',
      password: '',
  },
  auth: null,
  authError: null,
};

//const auth = handleActions(
//  {
//     [SAMPLE_ACTION]: (state, action) => state,
//  },
//  initialState,
//);
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, {payload: {form, key, value }}) =>
    produce(state, draft => {
      draft[form][key] = value; // ex) state.signup.username을 바꾼다.
    }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화 
    }),
    //회원가입 성공
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state, 
      authError: null,
      auth,
    }),
    //회원가입 실패
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state, 
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state, 
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state, 
      authError: error,
    }), 
  },
  initialState, 
)

export default auth;