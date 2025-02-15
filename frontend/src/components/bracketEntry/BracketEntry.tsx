import React from 'react';
import styles from './BracketEntry.module.css';
import { MatchupStateData } from '@playoff-bracket-app/database';
import BracketTeam from './BracketTeam';

export type BracketEntryProps = {
  state: MatchupStateData;
};

export default function BracketEntry({ state }: BracketEntryProps) {
  const hasMadePrediction = state.predictedWinner !== undefined;
  const lockedOutOfPrediction =
    !hasMadePrediction && state.winner !== undefined;
  const canMakePrediction =
    !lockedOutOfPrediction && state.predictedWinner === undefined;

  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <BracketTeam
          team={state.team_a}
          predictedTeam={state.predictedWinner}
          victoriousTeam={state.winner}
        />
        vs
        <BracketTeam
          team={state.team_b}
          predictedTeam={state.predictedWinner}
          victoriousTeam={state.winner}
        />
      </div>
      <div
        className={styles.wins}
      >{`${state.team_a_wins} - ${state.team_b_wins}`}</div>
      <div className={styles.predictionArea}>
        {lockedOutOfPrediction && 'Did not pick'}
        {hasMadePrediction &&
          `Picked ${state.predictedWinner} in ${state.number_of_games}`}
        {canMakePrediction && <button>Pick Winner</button>}
      </div>
    </div>
  );
}
