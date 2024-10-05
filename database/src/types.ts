export type UserData = {
  nickname: string;
  tournaments: TournamentData[];
};

export type TournamentData = {
  tournamentId: number;
  bracketName: string;
};
