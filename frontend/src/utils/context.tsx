import { TournamentData, UserData } from '@playoff-bracket-app/database';
import { createContext } from 'react';
import { TournamentChangeType } from './types';

const defaultUser: UserData = {
  userId: -1,
  nickname: '',
  tournaments: [],
};

const userContext = createContext<UserData>(defaultUser);
const tournamentContext = createContext<
  (tournament: TournamentData, changeType: TournamentChangeType) => void
>((t, c) => {
  return;
});

const tournamentIdContext = createContext<number>(0);

export { defaultUser, userContext, tournamentContext, tournamentIdContext };
