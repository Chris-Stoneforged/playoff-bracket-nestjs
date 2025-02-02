export type UserData = {
  userId: number;
  nickname: string;
  tournaments: TournamentData[];
};

export type TournamentData = {
  tournamentId: number;
  bracketName: string;
  memberData: MemberData[];
};

export type MemberData = {
  id: number;
  nickname: string;
};

export type BracketData = {
  id: number;
  bracket_name: string;
};
