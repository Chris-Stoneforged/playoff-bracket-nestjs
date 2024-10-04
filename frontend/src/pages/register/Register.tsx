import React, { useEffect, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { isLoggedIn } from '../../utils/loginUtils';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      email: email,
      nickname: nickname,
      password: password,
    };

    const response = await fetch(routes.user.register, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nickname:</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      ></input>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="submit">Register</button>
    </form>
  );
}
