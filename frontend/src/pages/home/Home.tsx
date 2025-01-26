import TournamentList from '../../components/tournamentList/TournamentList';
import React, { useContext } from 'react';
import './Home.css';
import { UserData } from '@playoff-bracket-app/database';
import userContext from '../../utils/context';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const user: UserData | null = useContext(userContext);
  if (user === null) {
    return null;
  }

  const handleTournamentClicked = (tournamentId: number) => {
    navigate(`/tournament/${tournamentId}`);
  };

  return (
    <div className="main">
      <TournamentList
        tournaments={user.tournaments}
        handleClick={handleTournamentClicked}
      ></TournamentList>
      {user.tournaments.length ? (
        <Outlet />
      ) : (
        <div>Select or create a tournament to get started</div>
      )}
    </div>
  );
}
