import { Prisma } from '@prisma/client';

type UserWithPredictionsWithMatchups = Prisma.UserGetPayload<{
  include: { predictions: { include: { matchup: true } } };
}>;

export function calculateUserScore(
  user: UserWithPredictionsWithMatchups
): number {
  let score = 0;
  for (const prediction of user.predictions) {
    if (
      prediction.matchup.winner &&
      prediction.winner === prediction.matchup.winner
    ) {
      // Double points for predicting finals match up
      score += prediction.matchup.advances_to ? 2 : 4;
      if (
        prediction.number_of_games ===
        prediction.matchup.team_a_wins + prediction.matchup.team_b_wins
      ) {
        // Estra point for predicting the correct number of games
        score += 1;
      }
    }
  }

  return score;
}
