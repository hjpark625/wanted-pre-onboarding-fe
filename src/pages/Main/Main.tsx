import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function Main() {
  const [authType, setAuthType] = useState('login');
  return (
    <div>
      {authType === 'login' ? (
        <Login setAuthType={setAuthType} />
      ) : (
        authType === 'register' && <Register setAuthType={setAuthType} />
      )}
    </div>
  );
}

export default Main;
