import { TournamentData, UserData } from '@playoff-bracket-app/database';
import { createContext } from 'react';
import { TournamentChangeType } from './types';

const defaultUser: UserData = {
  userId: -1,
  nickname: '',
  tournaments: [],
};

export type TournamentContext = {
  currentTournamentId: number;
  handleTournamentsChanged: (
    tournament: TournamentData,
    changeType: TournamentChangeType
  ) => void;
};

const userContext = createContext<UserData>(defaultUser);
const tournamentContext = createContext<TournamentContext>({
  currentTournamentId: -1,
  handleTournamentsChanged: (t, c) => {
    return;
  },
});

export { defaultUser, userContext, tournamentContext };
