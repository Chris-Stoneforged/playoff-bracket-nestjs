import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { postRequest, routes } from '../../utils/routes';
import { isLoggedIn } from '../../utils/loginUtils';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorText(null);

    const response = await postRequest(routes.user.register, {
      email: email,
      nickname: nickname,
      password: password,
    });

    if (response.status !== 200) {
      setErrorText('Registration failed!');
      setIsLoading(false);
      return;
    }

    const json = await response.json();
    navigate('/', { state: json.user });
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <text className={styles.headerText}>Create Account</text>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></input>
          <label style={{ marginTop: '4px' }}>Email:</label>
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
            className={styles.registerButton}
            type="submit"
          >
            {isLoading ? <LoadingSpinner /> : 'Create'}
          </button>
          {errorText !== null && (
            <p className={styles.errorText}>{errorText}</p>
          )}
        </form>
      </div>
    </div>
  );
}
