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
  const predictionNotInTeams =
    state.predictedWinner &&
    state.predictedWinner !== state.team_a &&
    state.predictedWinner !== state.team_b;

  const correctTeam =
    hasMadePrediction && state.predictedWinner === state.winner;
  const incorrectTeam =
    hasMadePrediction && state.predictedWinner !== state.winner;
  const correctNumberOfGames =
    correctTeam &&
    state.number_of_games === state.team_a_wins + state.team_b_wins;
  const inccorectNumberOfGames =
    state.number_of_games !== state.team_a_wins + state.team_b_wins;

  return (
    <div
      className={`${styles.container} ${
        state.winner && state.predictedWinner
          ? state.winner === state.predictedWinner
            ? styles.correct
            : styles.incorrect
          : predictionNotInTeams
          ? styles.incorrect
          : ''
      }`}
    >
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
        {hasMadePrediction && (
          <text>
            Picked{' '}
            <b
              className={
                correctTeam
                  ? styles.correctText
                  : incorrectTeam
                  ? styles.incorrectText
                  : ''
              }
            >
              {state.predictedWinner}
            </b>{' '}
            in{' '}
            <b
              className={
                correctNumberOfGames
                  ? styles.correctText
                  : inccorectNumberOfGames
                  ? styles.incorrectText
                  : ''
              }
            >
              {' '}
              {state.number_of_games}
            </b>
          </text>
        )}
        {state.requires_prediction && !hasMadePrediction && !locked && (
          <button onClick={handleMakePredictionClicked}>Make Prediction</button>
        )}
      </div>
    </div>
  );
}
