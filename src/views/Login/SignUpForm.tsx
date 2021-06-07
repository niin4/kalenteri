import React, { useState } from 'react';
import Input from '../../components/form/Input';
import styled from 'styled-components';

import firebase, { auth, createUserProfileDocument } from '../../utils/firebase';

const FormContainer = styled.form`
  display: flex;
  max-width: 500px;
  flex-direction: column;
`

const SignUpForm = () => {

  const [formData, setFormData] = useState(
    {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    })

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(formData.email, formData.password);
      if (user) {
        await createUserProfileDocument(user, {
          name: formData.name,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()) });
      }
      setFormData({ name: '', password: '', email: '', confirmPassword: '' });
    } catch (err) {
      console.log(err)
    }
    console.log('logging in with email and pw')
  };

  const allFilled = formData.name && formData.email && formData.password;

  return (<>
    <FormContainer onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <p>Sign up with your email and password</p>
      <Input
        label={'Name'}
        onChange={(value) => setFormData({ ...formData, name: value })}
        value={formData.name} />
      <Input
        label={'Email'}
        type={'email'}
        onChange={(value) => setFormData({ ...formData, email: value })}
        value={formData.email} />
      <Input
        label={'Password'}
        type={'password'}
        onChange={(value) => setFormData({ ...formData, password: value })}
        value={formData.password} />
      <Input
        label={'Confirm password'}
        type={'password'}
        onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
        value={formData.confirmPassword} />
      <input type="submit"
        disabled={!allFilled || formData.password !== formData.confirmPassword}
        value="Submit form" />
    </FormContainer>
  </>
  )
}

export default SignUpForm;
