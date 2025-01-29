import React, { useState } from 'react';
import styles from './JoinTournamentPopup.module.css';
import { TournamentData } from '@playoff-bracket-app/database';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

type JoinTournamentPopupProps = {
  handlePopupClosed: (tournament: TournamentData | null) => void;
};

export default function JoinTournamentPopup({
  handlePopupClosed,
}: JoinTournamentPopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const handleCodeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(event.target.value);
  };

  const handleJoinClicked = () => {
    console.log('Join clicked!');
  };

  return (
    <div className={styles.popupDarkenator}>
      <div className={styles.popupBody}>
        <div className={styles.topSection}>
          <text className={styles.joinHeaderText}>Join Tournament</text>
          <button
            className={styles.closeButton}
            disabled={isLoading}
            onClick={() => handlePopupClosed(null)}
          >
            X
          </button>
        </div>
        <input
          placeholder="Enter invite code..."
          value={inviteCode}
          type="text"
          onInput={handleCodeChanged}
          className={styles.inviteCodeInput}
        ></input>
        <div className={styles.spacer}></div>
        <div className={styles.bottomArea}>
          <button
            className={styles.joinButton}
            onClick={() => handleJoinClicked()}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
}
