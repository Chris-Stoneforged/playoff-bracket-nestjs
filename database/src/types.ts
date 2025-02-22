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

export type TournamentWithBracketData = {
  tournamentId: number;
  bracketWithMatchups: BracketMatchupsData;
  memberData: TournamentMemberData[];
};

export type TournamentMemberData = {
  id: number;
  nickname: string;
  score: number;
};

export type MatchupData = {
  id: number;
  round: number;
  left_side: boolean;
  team_a?: NBATeam;
  team_b?: NBATeam;
  team_a_wins: number;
  team_b_wins: number;
  winner?: NBATeam;
  advances_to?: number;
  best_of?: number;
};

export type MatchupStateData = MatchupData & {
  requires_prediction: boolean;
  predictedWinner?: NBATeam;
  number_of_games?: number;
};

export type BracketData = {
  id: number;
  predictions_locked: boolean;
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

export type NBATeam =
  | 'Hawks'
  | 'Celtics'
  | 'Nets'
  | 'Hornets'
  | 'Bulls'
  | 'Cavaliers'
  | 'Mavericks'
  | 'Nuggets'
  | 'Pistons'
  | 'Warriors'
  | 'Rockets'
  | 'Pacers'
  | 'Clippers'
  | 'Lakers'
  | 'Grizzlies'
  | 'Heat'
  | 'Bucks'
  | 'Timberwolves'
  | 'Pelicans'
  | 'Knicks'
  | 'Thunder'
  | 'Magic'
  | 'Sixers'
  | 'Suns'
  | 'Blazers'
  | 'Kings'
  | 'Spurs'
  | 'Raptors'
  | 'Jazz'
  | 'Wizards';
