import React, { useState } from 'react';
import styled from 'styled-components';

export interface IUserInfo {
  email: string;
  password: string;
}

function Register() {
  const [submitInfo, setSubmitInfo] = useState<IUserInfo>({
    email: '',
    password: '',
  });

  const getInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setSubmitInfo({ ...submitInfo, [name]: value });
  };

  return (
    <RegisterSection>
      <RegisterTitle>회원가입</RegisterTitle>
      <IdInput type="text" name="email" onChange={e => {}} />
      <PasswordInput type="password" name="password" onChange={e => {}} />
      <SubmitButton id="signup" onClick={e => {}}>
        등록
      </SubmitButton>
    </RegisterSection>
  );
}

export default Register;

const RegisterSection = styled.section``;

const RegisterTitle = styled.div``;

const IdInput = styled.input``;

const PasswordInput = styled.input``;

const SubmitButton = styled.button``;
