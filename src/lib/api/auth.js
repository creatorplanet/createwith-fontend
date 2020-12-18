// 회원 인증에 필요한 API를 사용하기 쉽도록 함수화하여 파일로 작성한다

import client from './client';

// 로그인
export const login = ({ username, password }) =>
    client.post('/api/auth/login', { username, password });

// 회원가입
export const signup = ({ username, password }) =>
    client.post('/api/auth/signup', { username, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');