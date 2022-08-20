import React from 'react';
import styled from 'styled-components';

function Login() {
  return (
    <LoginSection>
      <LoginTitle>로그인</LoginTitle>
      <IdInput
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={e => {}}
      />
      <PasswordInput
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={e => {}}
      />
      <LoginButton type="button" onClick={e => {}}>
        로그인
      </LoginButton>
    </LoginSection>
  );
}

export default Login;

const LoginSection = styled.section``;

const LoginTitle = styled.div``;

const IdInput = styled.input``;

const PasswordInput = styled.input``;

const LoginButton = styled.button``;
