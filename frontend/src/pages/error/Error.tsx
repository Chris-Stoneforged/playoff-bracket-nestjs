import React from 'react';
import styles from './Error.module.css';
import { useNavigate, useRouteError } from 'react-router-dom';
import HeaderBar from '../../components/headerBar/HeaderBar';

export default function Error() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  const navigate = useNavigate();

  const handleHomeClicked = () => {
    navigate('/');
  };

  return (
    <div className={styles.rootDiv}>
      <HeaderBar
        user={null}
        handleLogout={() => {
          /**/
        }}
      ></HeaderBar>
      <div className={styles.errorContent}>
        <h1>Yikes!</h1>
        <p> An unexpected error has occurred:</p>
        <p className={styles.errorText}>
          <i>{error.statusText || error.message}</i>
        </p>
        <button
          className={styles.homeButton}
          onClick={() => handleHomeClicked()}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
