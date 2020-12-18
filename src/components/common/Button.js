import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

// StyledButton을 바로 내보내도 상관없지만, 
// styled-components로 만든 컴포넌트를 바로 내보내면 자동 import가 제대로 작동하지 않는다.
// 굳이 Button 리액트 컴포넌트를 만들어서 그 안에 StyledButton을 렌더링해 준 이유는
// 추후 이 컴포넌트를 사용할 때 자동 import 되게 하기 위해서 이다. 

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem 0.5rem 0.5rem;
  color: white;
  outline: none;
  cursor: pointer; 
  
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]}
  }

// login Button에 밝은 파란색을 넣고 widthfmf 100% 차지하는 것으로 수정
  ${props =>
    props.fullWidth &&
    css`
       padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
    `}

    ${props =>
     props.cyan &&
    css`
        background: ${palette.cyan[5]}};
        &:hover {
          background: ${palette.cyan[4]};
        };
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}`;

const StyledLink = styled(Link)`
  ${buttonStyle}`;

  const Button = props => {
    return props.to ? (
      <StyledLink {...props} cyan={props.cyan ? 1 : 0 } />
      ) : (
        <StyledButton {...props} />
      );
    };

  export default Button;