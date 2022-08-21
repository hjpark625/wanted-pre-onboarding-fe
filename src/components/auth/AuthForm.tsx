import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

interface TextMap {
  login: string;
  register: string;
}
interface AuthFormProps {
  type: keyof TextMap;
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
}
interface UserInfo {
  email: string;
  password: string;
  passwordConfirm?: string;
}
interface ButtonStyledProps {
  fullWidth: boolean | null;
  cyan: boolean | null;
}

const textMap: TextMap = {
  login: '로그인',
  register: '회원가입',
};

function AuthForm({ type, setAuthType }: AuthFormProps) {
  const [UserInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);

  const text = textMap[type];

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setUserInfo({ ...UserInfo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (UserInfo.email.includes('@')) {
  //     setError('이메일 형식이 아닙니다.');
  //   }
  // }, [UserInfo]);

  return (
    <AuthFormWrapper>
      <h3>{text}</h3>
      <form>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="아이디"
          onChange={handleChangeUserInfo}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={handleChangeUserInfo}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={handleChangeUserInfo}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton
          cyan
          fullWidth
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          {text}
        </SubmitButton>
      </form>
      <Footer>
        {type === 'login' ? (
          <ChangeAuthButton
            onClick={() => {
              setAuthType('register');
            }}
          >
            회원가입
          </ChangeAuthButton>
        ) : (
          <ChangeAuthButton
            onClick={() => {
              setAuthType('login');
            }}
          >
            로그인
          </ChangeAuthButton>
        )}
      </Footer>
    </AuthFormWrapper>
  );
}

export default AuthForm;

const AuthFormWrapper = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: bolder;
  }
`;

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

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ChangeAuthButton = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button<ButtonStyledProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

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
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;
