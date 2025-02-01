import TournamentList from '../../components/tournamentList/TournamentList';
import React, { useContext, useEffect } from 'react';
import styles from './Home.module.css';
import { userContext, UserDataContext } from '../../utils/context';
import { Outlet } from 'react-router-dom';

export default function Home() {
  const { user }: UserDataContext = useContext(userContext);
  if (user === null) {
    return null;
  }

  return (
    <div className={styles.main}>
      <TournamentList />
      {user.tournaments?.length ? (
        <Outlet />
      ) : (
        <div className={styles.noTournamentDefault}>
          <p>Create or join a tournament to get started!</p>
        </div>
      )}
    </div>
  );
}
