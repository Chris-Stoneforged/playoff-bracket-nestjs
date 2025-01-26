export type UserData = {
  nickname: string;
  tournaments: TournamentData[];
};

export type TournamentData = {
  tournamentId: number;
  bracketName: string;
};

export type MemberData = {
  id: number;
  nickname: string;
  score: number;
};

export type TournamentDetailedData = TournamentData & {
  memberData: MemberData[];
};
