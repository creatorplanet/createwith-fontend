//UI 개발
import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
// 홈경로 '/'로 돌아가는 링크도 보여준다. 
import { Link } from 'react-router-dom';

/* 회원가입/로그인 폼을 보여 줍니다. */
const AuthFormWrapper = styled.div`
  h3 {
    margin: 0;
    color : ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/* 스타일링된 input */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  `;
  
/* 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a { 
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
   } }`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`

/* 회원 인증 Error를 보여준다. */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;`;


  //type props에 따라 다른 내용을 보여주도록 한다. type 값에 따라 사용되는 문구도 달라지고, type이 'signup' 일 때는 비밀번호 확인 인풋도 보여준다.
const textMap = {
  login: 'Log in',
  signup: 'Sign up',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type]; 

  return (
    <AuthFormWrapper>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput 
                autoComplete="username"
                name="username"
                placeholder="Use phone / email / username"
                onChange={onChange}
                value={form.username}/>
        <StyledInput 
                autoComplete="new-password"
                name="password"
                placeholder="password"
                type="password"
                onChange={onChange}
                value={form.password}/>
      {type === 'signup' && (
        <StyledInput 
        autoComplete="new-password"
        name="passwordConfirm"
        placeholder="password confirm"
        type="password"
        onChange={onChange}
        value={form.passwordConfirm}/>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}  
      <ButtonWithMarginTop fullWidth  > {text} </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="signup">Sign up</Link>
        ) : (
          <Link to="/login">Log in </Link>
        )}
      </Footer> 
    </AuthFormWrapper>
  );
};

export default AuthForm;