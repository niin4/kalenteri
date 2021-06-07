import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  color: red;
  margin-bottom: 1rem;
`

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {text}
    </StyledButton>
  )
}

export default Button;
