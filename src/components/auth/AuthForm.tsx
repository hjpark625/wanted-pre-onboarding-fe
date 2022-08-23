import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import palette from '../../styles/palette';
import API from '../../config';

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
}
interface ButtonStyledProps {
  fullWidth: boolean | null;
  cyan: boolean | null;
  disabled?: boolean | null;
}

const textMap: TextMap = {
  login: '로그인',
  register: '회원가입',
};

function AuthForm({ type, setAuthType }: AuthFormProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const text = textMap[type];

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'register') {
      await axios
        .post(
          API.SIGN_UP,
          {
            email: userInfo.email,
            password: userInfo.password,
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(res => {
          alert('회원가입 성공!');
        })
        .catch(err => console.error(err));
    } else if (type === 'login') {
      await axios
        .post(
          API.SIGN_IN,
          {
            email: userInfo.email,
            password: userInfo.password,
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(res => {
          localStorage.setItem('access_token', res.data.access_token);
          navigate('/todo');
        })
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    if (!userInfo.email && !userInfo.password) {
      setError('정보를 입력해주세요');
    } else if (!userInfo.email.includes('@' && '.com')) {
      setError('이메일 형식이 아닙니다.');
    } else if (userInfo.password.length < 8) {
      setError('비밀번호는 8자 이상입력해주세요');
    } else {
      setError(null);
    }
  }, [error, userInfo.email, userInfo.password]);

  return (
    <AuthFormWrapper>
      <h3>{text}</h3>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          onChange={handleChangeUserInfo}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          onChange={handleChangeUserInfo}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton
          cyan
          fullWidth
          disabled={
            userInfo.email.includes('@' && '.com') &&
            userInfo.password.length > 7
              ? false
              : true
          }
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

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${({ cyan }) =>
    cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

    ${({ disabled }) =>
    disabled &&
    css`
      background: ${palette.gray[4]};
      cursor: not-allowed;
      &:hover {
        background: ${palette.gray[4]};
      }
    `}
`;
