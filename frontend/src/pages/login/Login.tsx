import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { postRequest, routes } from '../../utils/routes';
import { isLoggedIn } from '../../utils/loginUtils';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/', { replace: true });
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await postRequest(routes.user.login, {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const json = await response.json();
      navigate('/', { state: json.user });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div>
        <div>Don't have an account?</div>
        <button onClick={() => navigate('/register')}>Register Now</button>
      </div>
    </div>
  );
}
