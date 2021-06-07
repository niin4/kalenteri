import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const FormsContainer = styled.div`
  display: flex;
  flex-direction: row;

  form {
    margin-right: 2rem;
  }
`

const LoginView = () => {
  return (
    <div>
      <h2>Login and register!</h2>
      <FormsContainer>
        <LoginForm />
        <SignUpForm />
      </FormsContainer>
    </div>
  )
}

export default LoginView;
