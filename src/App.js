//Route 컴포넌트를 사용하여 각 라우트의 경로를 지정한다
import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from  './pages/SignupPage';


function App() {
  return (
    <>
    <Route component={HomePage} path="/" exact />
    <Route component={LoginPage} path="/login" />
    <Route component={SignupPage} path="/signup" />
    </>
  );
}

export default App;
