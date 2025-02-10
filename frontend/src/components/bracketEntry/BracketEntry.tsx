import React from 'react';
import styles from './BracketEntry.module.css';
import { MatchupStateData } from '@playoff-bracket-app/database';
import logos from '../../utils/logos';

export type BracketEntryProps = {
  state: MatchupStateData;
};

export default function BracketEntry({ state }: BracketEntryProps) {
  const teamA = state.team_a || 'Unknown';
  const teamB = state.team_b || 'Unknown';

  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <img
          src={logos[teamA]}
          alt={state.team_a || 'Unknown'}
          className={styles.logo}
        ></img>
        vs
        <img
          src={logos[teamB]}
          alt={state.team_b || 'Unknown'}
          className={styles.logo}
        ></img>
      </div>
      <div className={styles.wins}>0 - 0</div>
    </div>
  );
}
