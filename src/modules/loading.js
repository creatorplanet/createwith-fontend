// redux-saga를 통해 더 쉽게 API를 요청할 수 있도록 loading redux module과 createRequestSaga 유틸 함수를 설정하겠습니다 
// 먼저 loading redux module을 작성합니다.
//리듀서를 만든 후 modules/index rootreducer에 등록합니다.

import { createAction, handleActions } from 'redux-actions'; 

const STRAT_LOADING = 'loading/START_ACTION';  
const FINISH_LOADING = 'loading/FINISH_ACTION';  

/*요청을 위한 액션 타입을 payload로 설정합니다. (예: "sample/GET_POST") */

export const startLoading = createAction(
  STRAT_LOADING,
  requestType => requestType,
  ); 
export const finishLoading = createAction(
   FINISH_LOADING,
   requestType => requestType,
   ); 

const initialState = {};

const loading = handleActions(
  {
     [STRAT_LOADING]: (state, action) => ({
       ...state,
       [action.payload]: true,
  }),
    [FINISH_LOADING]: (state, action) => ({
       ...state,
       [action.payload]: false,
  }),
  },
  initialState,
);

export default loading;