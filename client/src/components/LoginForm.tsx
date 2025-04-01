// client/src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm: React.FC = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
      />
      <button type="submit">Login</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default LoginForm;
