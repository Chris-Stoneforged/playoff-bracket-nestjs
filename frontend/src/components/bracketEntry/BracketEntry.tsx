import React from 'react';
import styles from './BracketEntry.module.css';
import { MatchupStateData } from '@playoff-bracket-app/database';
import BracketTeam from './BracketTeam';

export type BracketEntryProps = {
  state: MatchupStateData;
  locked: boolean;
  handleMakePredictionClicked: () => void;
};

export default function BracketEntry({
  state,
  locked,
  handleMakePredictionClicked,
}: BracketEntryProps) {
  const hasMadePrediction = state.predictedWinner !== undefined;

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
        {locked && !hasMadePrediction && 'Did not pick'}
        {hasMadePrediction &&
          `Picked ${state.predictedWinner} in ${state.number_of_games}`}
        {state.requires_prediction && !hasMadePrediction && !locked && (
          <button onClick={handleMakePredictionClicked}>Make Prediction</button>
        )}
      </div>
    </div>
  );
}
