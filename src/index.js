import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';  //라우터 컴포넌트
// 스토어 생성, Provider를 통해 프로젝트에 redux 적용
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { rootSaga} from "./modules";
// 스토어에 redux-saga 미들웨어를 적용한다.
import createSagaMiddleware from 'redux-saga';

// store에 redux-saga 미들웨어 적용
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}> 
   <BrowserRouter> 
     <React.StrictMode>
      <App />
     </React.StrictMode>
   </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
