/* 로그인 상태 보여주기 */
// 헤더 컴포넌트에 redux를 연결시켜봅시다.

import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return <Header user={user} />;
};

export default HeaderContainer;