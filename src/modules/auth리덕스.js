// 추후 비동기 작업을 관리하는 과정에서 redux-saga를 쓸 텐데, 당상은 미들웨어에 대한 관심은 접어 둔 채 
//리덕스 스토어를 생성하고 Provider 컴포넌트를 통해 프로텍드에 리덕스를 적용하는 과정만 다루도록 하겠다. 

//리듀서의 틀을 만든다 
//리덕스 모듈을 만든다. 이 프로젝트에서 Ducks 패턴을 사용하여 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의 되어 있는 리덕스 모듈을 작성할 것이다.
import { createAction, handleActions } from 'redux-actions'; 

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION'; 

export const sampleAction = createAction(SAMPLE_ACTION);
const initialState = {};
const auth = handleActions(
  {
     [SAMPLE_ACTION]: (state, action) => state,
  },
  initialState,
);

export default auth;