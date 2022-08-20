import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import Register from './Register';

function Main() {
  const token = localStorage.getItem('token');
  return <MainWrapper>{!token ? <Register /> : <Login />}</MainWrapper>;
}

export default Main;

const MainWrapper = styled.div``;
