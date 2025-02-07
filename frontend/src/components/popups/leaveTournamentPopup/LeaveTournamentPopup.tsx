import React, { useContext, useState } from 'react';
import styles from './LeaveTournamentPopup.module.css';
import PopupWithSubmit from '../popupTemplate/PopupWithSubmit';
import { tournamentContext, userContext } from '../../../utils/context';
import { postRequest } from '../../../utils/routes';
import { useNavigate } from 'react-router-dom';
import { UserData } from '@playoff-bracket-app/database';

type LeaveTournamentPopupProps = {
  handlePopupClosed: () => void;
};

export default function LeaveTournamentPopup({
  handlePopupClosed,
}: LeaveTournamentPopupProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const { currentTournamentId, handleTournamentsChanged } =
    useContext(tournamentContext);

  const handleSubmitClicked = async () => {
    setIsLoading(true);
    const response = await postRequest(
      `/api/v1/tournament/${currentTournamentId}/leave`
    );

    if (response.status !== 200) {
      setErrorText('Something went wrong!');
      setIsLoading(false);
      return;
    }

    handleTournamentsChanged(
      { tournamentId: currentTournamentId, bracketName: '', memberData: [] },
      'Removed'
    );
    handlePopupClosed();
  };

  return (
    <PopupWithSubmit
      title="Leave Tournament"
      disabled={isLoading}
      errorText={errorText}
      loading={isLoading}
      submitButtonText="Leave"
      handlePopupClosed={handlePopupClosed}
      handleSubmit={handleSubmitClicked}
    >
      <div className={styles.leaveText}>
        Are you sure you want to leave the tournament?
      </div>
    </PopupWithSubmit>
  );
}
