import React, { useState } from 'react';
import styles from './JoinTournamentPopup.module.css';
import { TournamentData } from '@playoff-bracket-app/database';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import PopupWithSubmit from '../popupTemplate/PopupWithSubmit';

type JoinTournamentPopupProps = {
  handlePopupClosed: (tournament: TournamentData | null) => void;
};

export default function JoinTournamentPopup({
  handlePopupClosed,
}: JoinTournamentPopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleCodeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(event.target.value);
  };

  const handleJoinClicked = () => {
    if (inviteCode === '') {
      setErrorText('Invalid invite code');
      return;
    }
  };

  return (
    <PopupWithSubmit
      title="Join Tournament"
      submitButtonText="Join"
      loading={isLoading}
      disabled={isLoading}
      errorText={errorText}
      handlePopupClosed={() => handlePopupClosed(null)}
      handleSubmit={() => handleJoinClicked()}
    >
      <input
        placeholder="Enter invite code..."
        value={inviteCode}
        type="text"
        onInput={handleCodeChanged}
        className={styles.inviteCodeInput}
      ></input>
    </PopupWithSubmit>
  );
}
