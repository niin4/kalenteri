import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  color: blue;
  margin-bottom: 1rem;
`

interface InputProps {
  label?: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}

const Input: React.FC<InputProps> = ({ label, type = 'text,', onChange, ...rest }) => {
  return (<>
    {label && <label>{label}</label>}
    <StyledInput
      onChange={(e) => onChange(e.target.value)}
      type={type}
      {...rest} />
  </>
  )
}

export default Input;
