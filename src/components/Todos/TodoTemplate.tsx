import React from 'react';
import styled from 'styled-components';

interface ChildrenProps {
  children: JSX.Element | React.ReactElement | React.ReactNode;
}

function TodoTemplate({ children }: ChildrenProps) {
  return (
    <TodoWrapper>
      <AppTitle>Todo APP</AppTitle>
      <Content>{children}</Content>
    </TodoWrapper>
  );
}

export default TodoTemplate;

const TodoWrapper = styled.div`
  width: 512px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;

const AppTitle = styled.div`
  background: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background: white;
  max-height: 30rem;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
