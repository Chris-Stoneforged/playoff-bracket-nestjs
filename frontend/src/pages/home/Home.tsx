import TournamentList from '../../components/tournamentList/TournamentList';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import { tournamentContext, userContext } from '../../utils/context';
import { Outlet, useNavigate } from 'react-router-dom';
import { TournamentData, UserData } from '@playoff-bracket-app/database';
import { TournamentChangeType } from '../../utils/types';

export default function Home() {
  const navigate = useNavigate();
  const user: UserData = useContext(userContext);
  const [tournaments, setTournaments] = useState<TournamentData[]>([]);
  const [currentTournament, setCurrentTournament] = useState(-1);

  useEffect(() => {
    if (user?.tournaments) {
      setTournaments(user.tournaments);
    }
  }, [user]);

  const handleTournamentChanged = (
    tournament: TournamentData,
    changeType: TournamentChangeType
  ) => {
    switch (changeType) {
      case 'Added': {
        setTournaments([...tournaments, tournament]);
        navigate(`/tournament/${tournament.tournamentId}`);
        setCurrentTournament(tournament.tournamentId);
        break;
      }
      case 'Removed': {
        setTournaments(
          tournaments.filter((t) => t.tournamentId !== tournament.tournamentId)
        );
        navigate('/');
        setCurrentTournament(-1);
        break;
      }
      case 'Selected': {
        setCurrentTournament(tournament.tournamentId);
        navigate(`/tournament/${tournament.tournamentId}`);
        break;
      }
    }
  };

  return (
    <div className={styles.main}>
      <tournamentContext.Provider
        value={{
          currentTournamentId: currentTournament,
          handleTournamentsChanged: handleTournamentChanged,
        }}
      >
        <TournamentList tournaments={tournaments} />
        {user.tournaments.length ? (
          <Outlet />
        ) : (
          <div className={styles.noTournamentDefault}>
            <p>Create or join a tournament to get started!</p>
          </div>
        )}
      </tournamentContext.Provider>
    </div>
  );
}
