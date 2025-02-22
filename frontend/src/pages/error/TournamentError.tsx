import React from 'react';
import styles from './Error.module.css';
import { useRouteError } from 'react-router-dom';
import HeaderBar from '../../components/headerBar/HeaderBar';

export default function TournamentError() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <div className={styles.errorContent}>
      <h1>Yikes!</h1>
      <p> An unexpected error has occurred:</p>
      <p className={styles.errorText}>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
