import React, { useState } from 'react';
import Button from '../../components/buttons/Button';
import Input from '../../components/form/Input';
import styled from 'styled-components';
import { auth, signInWithGoogle } from '../../utils/firebase';

const FormContainer = styled.form`
  display: flex;
  max-width: 500px;
  flex-direction: column;
`

const LoginForm = () => {

  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = async  (e: any) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(formData.email, formData.password);
      setFormData({email: '', password: ''});
    } catch (err) {
      console.log(err)
    }
  };

  return (<>
    <FormContainer onSubmit={handleSubmit}>
    <h3>Login</h3>
      <Input
        label={'Email'}
        onChange={(value) => setFormData({ ...formData, email: value })}
        value={formData.email} />
      <Input
        label={'Password'}
        type={'password'}
        onChange={(value) => setFormData({ ...formData, password: value })}
        value={formData.password} />
        <input type="submit" value="Submit form" />
    <Button onClick={signInWithGoogle} text={'Google login'} />
    </FormContainer>
  </>
  )
}

export default LoginForm;
