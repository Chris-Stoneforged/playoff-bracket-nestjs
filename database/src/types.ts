export type UserData = {
  userId: number;
  nickname: string;
  tournaments: TournamentData[];
};

export type TournamentData = {
  tournamentId: number;
  bracketName: string;
  memberData: TournamentMemberData[];
};

export type TournamentMemberData = {
  id: number;
  nickname: string;
};

export type MatchupData = {
  id: number;
  round: number;
  left_side: boolean;
  team_a?: string;
  team_b?: string;
  winner?: string;
  advances_to?: number;
  best_of?: number;
};

export type MatchupStateData = MatchupData & {
  predictedWinner?: string;
  number_of_games?: number;
};

export type BracketData = {
  id: number;
  bracket_name: string;
  left_side_name: string;
  right_side_name: string;
};

export type BracketMatchupsData = BracketData & {
  matchups: MatchupData[];
};

export type BracketStateData = BracketData & {
  root_matchup_id: number;
  matchups: MatchupStateData[];
};
