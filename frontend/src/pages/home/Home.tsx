import TournamentList from '../../components/tournamentList/TournamentList';
import React, { useContext } from 'react';
import './Home.css';
import userContext, { UserDataContext } from '../../utils/context';
import { Outlet } from 'react-router-dom';

export default function Home() {
  const { user }: UserDataContext = useContext(userContext);
  if (user === null) {
    return null;
  }

  return (
    <div className="main">
      <TournamentList />
      {user.tournaments.length ? (
        <Outlet />
      ) : (
        <div>Select or create a tournament to get started</div>
      )}
    </div>
  );
}
