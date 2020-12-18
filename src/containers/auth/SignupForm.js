/* 회원가입 기능 구현 */

// useEffect를 사용하여 맨 처음 렌더링 후 initializeForm 액션 생성 함수를 호출했다 
// 이 작업을 하지 않으면, 로그인 페이지에서 값을 입력한 뒤 다른 페이지로 이동했다가 다시 돌아왔을 때 값이 유지된 상태로 보이게 된다. 
import React, { useEffect, useState } from 'react';
//useDispatch, useSelector 함수를 사용하여 컴포넌트를 redux와 연동시킵니다
//이 프로젝트에서 작성할 모든 container component는 connect 함수 대신 Hooks를 사용하여 구현할 것입니다.
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
//redux module을 다 작성했으면, 회원가입 성공 후 check을 호출하여 현재 사용자가 로그인 상태가 되었는지 확인해 보세요.
import { check } from '../../modules/user';

//(이해되면 주석 delete) 회원가입에 성공했다면 홈 화면으로 라우트를 이동시켜봅시다. SignupForm에서 history 객ㅊ체를 사용하려면 withRouser로 컴포넌트를 감싸 주면 됩니다.
import { withRouter } from 'react-router-dom' 

//*용어 dispatch는 store의 내장 함수 중 하나이다. '액션을 발생시키는 것'이라고 이해하면 된다. 
//이 함수는 dispatch(action)과 같은 형태로 액션 객체를 파리미터로 넣어서 호출한다
// 이 함수가 호출되면 store는 reducer 함수를 실행시켜서 새로운 상태로 만들어 준다. 

const SignupForm = ({history}) => {
  const [error, setError ] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signup,
    auth: auth.auth, 
    authError: auth.authError,
    user: user.user
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'signup',
        key: name,
        value
      })
    );
  };

  //Form 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    //회원가입 기능 구현
    const { username, password, passwordConfirm } = form;
    // 1. username, password, passwordConfirm 중 하나라도 비어 있다면
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 2. password와 passwordConfirm 값이 일치하지 않을 때
    if (password !== passwordConfirm ) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'signup', key: 'password', value: ''}));
      dispatch(changeField({ form: 'signup', key: 'passwordConfirm', value: ''})); 
      return;
    }
    dispatch(signup({ username, password }));
  };





/* 결과를 얻었을 때 특정 작업을 하기 위해 useEffect를 사용 
useEffect에 넣어 준 함수는 auth 값 혹은 authError 값 중에서 무엇이 유효한지에 따라 다른 작업을 합니다.*/

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      // 3. username이 중복될 때 (계정명이 이미 존재할 때)
      if (authError.response.status === 400 ){
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      //기타 이유
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      /* 회원가입에 성공하면 localhost:3000 으로 이동할 것  (실제 test 완료하면 delete)*/
      history.push('/'); // 홈 화면으로 이동
    }
  }, [history, user]);


  return (
    <AuthForm
        type="signup"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
    />
  );
};

export default withRouter(SignupForm)