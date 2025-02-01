import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { postRequest, routes } from '../../utils/routes';
import { isLoggedIn } from '../../utils/loginUtils';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/', { replace: true });
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText(null);
    setIsLoading(true);

    const response = await postRequest(routes.user.login, {
      email: email,
      password: password,
    });

    if (response.status !== 200) {
      setErrorText('Invalid login details');
      setIsLoading(false);
      return;
    }

    const json = await response.json();
    navigate('/', { state: json.user });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <text className={styles.headerText}>Log In</text>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label style={{ marginTop: '4px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            disabled={isLoading}
            className={styles.loginButton}
            type="submit"
          >
            {isLoading ? <LoadingSpinner /> : 'Log In'}
          </button>
          {errorText !== null && (
            <p className={styles.errorText}>{errorText}</p>
          )}
        </form>
        <p className={styles.registerLinkArea}>
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')}>Register now.</button>
        </p>
      </div>
    </div>
  );
}
