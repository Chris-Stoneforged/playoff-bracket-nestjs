import React from 'react';
import styles from './BracketTeam.module.css';
import logos from '../../utils/logos';
import tick from '../../assets/tick.png';
import cross from '../../assets/cross.png';
import { NBATeam } from '@playoff-bracket-app/database';

export type BracketTeamProps = {
  team: NBATeam | undefined;
  predictedTeam: string | undefined;
  victoriousTeam: string | undefined;
};

export default function BracketTeam({
  team,
  predictedTeam,
  victoriousTeam,
}: BracketTeamProps) {
  const bracketTeam = team || 'Unknown';
  const predictionMade = predictedTeam !== undefined;
  const outcomeDecided = victoriousTeam !== undefined;
  const isPredicted = predictedTeam === team;
  const isVictorious = victoriousTeam === team;

  return (
    <div className={styles.logo}>
      <img
        src={logos[bracketTeam]}
        alt={bracketTeam}
        className={`${styles.teamImage} ${
          predictionMade
            ? isPredicted
              ? styles.predicted
              : styles.notPredicted
            : ''
        }`}
      ></img>
      {outcomeDecided && predictionMade && isPredicted && isVictorious && (
        <img src={tick} alt="tick" className={styles.overlayImage}></img>
      )}
      {outcomeDecided && predictionMade && isPredicted && !isVictorious && (
        <img src={cross} alt="cross" className={styles.overlayImage}></img>
      )}
    </div>
  );
}
