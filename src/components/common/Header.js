import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import Responsive from './Responsive';
import Button from './Button';
import official from './Official';

const HeaderWrapper = styled.div`
  position: fixed; /*Header 컴포넌트가 언제나 페이지 상단에 떠 있도록 position 값을 fixed로 설정 / 그런데 position을 fixed로 설정하면 Header 컴포넌트 하단에 나오는 콘텐츠가 헤더의 위치과 겹치게 되므로 Space 컴포넌트를 만듬 */
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  `;

/* Responsive  컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성 */

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /*자식 Element 사이의 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
  `;

/* Header가 fixed로 되어 있기 때문에 page의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트*/
const Spacer = styled.div`
  height: 4rem;
  `;

/*user 값이 주어질 경우 계정명과 로그아웃 버튼을 보여주도록 한다. */
const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem; 
 `;

const Header = ( { user } ) => {
  return (
    <>
      <HeaderWrapper>
        <Wrapper>
          <Link to="/" className="logo">{official.company}</Link> 
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button>로그아웃</Button> 
             </div> 
          ) : (
            <div className="right"> 
            <Button to="/login">Log in</Button>
            </div>
          )}
 
        </Wrapper>
      </HeaderWrapper>
      <Spacer/>
    </>
  );
};

export default Header;