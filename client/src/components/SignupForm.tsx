// client/src/components/SignupForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm: React.FC = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...formState } });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={formState.username}
        onChange={(e) => setFormState({ ...formState, username: e.target.value })}
      />
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
      <button type="submit">Sign Up</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default SignupForm;
