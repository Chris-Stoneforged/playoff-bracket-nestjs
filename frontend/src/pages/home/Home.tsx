import TournamentList from '../../components/tournamentList/TournamentList';
import TournamentPanel from '../../components/tournamentPanel/TournamentPanel';
import React, { useContext } from 'react';
import './Home.css';
import { UserData } from '@playoff-bracket-app/database';
import userContext from '../../utils/context';

export default function Home() {
  const user: UserData | null = useContext(userContext);
  if (user === null) {
    return null;
  }

  const handleTournamentClicked = (tournamentId: number) => {
    console.log(`Selected tournament with id ${tournamentId}`);
  };

  return (
    <div className="main">
      <TournamentList
        tournaments={user.tournaments}
        handleClick={handleTournamentClicked}
      ></TournamentList>
      <TournamentPanel />
    </div>
  );
}
