//반응형 디자인을 할 때 더 편하게 작어하기 위해 Responsive component를 만들었다
import React from 'react';
import styled from 'styled-components';

const ResponsiveWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  margin: 0 auto; /*중앙정렬*/
  
  /* 브라우저 크기에 따라 가로 크기 변경 */
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  `;


const Responsive = ({ children, ...rest }) => {
  // style, className, onClick, onMouseMove 등의 props를 사용할 수 있도록
  // ...rest를 사용하여 ResponsiveWrapper에게 전달
  return <ResponsiveWrapper {...rest}>{children}</ResponsiveWrapper>;
};

export default Responsive;