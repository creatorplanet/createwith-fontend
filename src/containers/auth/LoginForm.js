// useEffect를 사용하여 맨 처음 렌더링 후 initializeForm 액션 생성 함수를 호출했다 
// 이 작업을 하지 않으면, 로그인 페이지에서 값을 입력한 뒤 다른 페이지로 이동했다가 다시 돌아왔을 때 값이 유지된 상태로 보이게 된다. 
import React, { useEffect, useState } from 'react';
//useDispatch, useSelector 함수를 사용하여 컴포넌트를 redux와 연동시킵니다
//이 프로젝트에서 작성할 모든 container component는 connect 함수 대신 Hooks를 사용하여 구현할 것입니다.
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom'

//*용어 dispatch는 store의 내장 함수 중 하나이다. '액션을 발생시키는 것'이라고 이해하면 된다. 이 함수는 dispatch(action)과 같은 형태로 액션 객체를 파리미터로 넣어서 호출한다
// 이 함수가 호출되면 store는 리듀서 함수를 실행시켜서 새로운 상태로 만들어 준다. 

const LoginForm = ({history}) => {
  const [error, setError ] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({auth, user}) => ({
    form: auth.login,
    auth: auth.auth, 
    authError: auth.authError,
    user: user.user
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value
      })
    );
  };

  //Form 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));  
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  //로그인 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공'); 
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      /* 로그인에 성공하면 localhost:3000 으로 이동할 것  (실제 test 완료하면 delete)*/
      history.push('/'); // 홈 화면으로 이동
    }
  }, [history, user]);

  return (
    <AuthForm
        type="login"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
    />
  );
};

export default withRouter(LoginForm)