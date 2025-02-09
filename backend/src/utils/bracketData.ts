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

export type BracketData = {
  bracketName: string;
  matchups: MatchupData[];
  leftSideName: string;
  rightSideName: string;
};

export type MatchupState = MatchupData & {
  predictedWinner?: string;
  number_of_games?: number;
};
