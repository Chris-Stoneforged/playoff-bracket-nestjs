import { useNavigate, useParams } from 'react-router-dom';
import { postRequest } from '../../../utils/routes';
import Popup from '../popupTemplate/Popup';
import styles from './GetInviteCodePopup.module.css';
import React, { useEffect, useState } from 'react';
import copy from '../../../assets/copy.png';

export default function GetInviteCodePopup() {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isValidCode, setIsValidCode] = useState(true);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const currentTournamentId: number = tournamentId
    ? Number.parseInt(tournamentId)
    : -1;

  const handleCopyClicked = () => {
    navigator.clipboard.writeText(inviteCode);
  };

  const handlePopupClosed = () => {
    navigate(-1);
  };

  useEffect(() => {
    const loadInviteCode = async () => {
      setIsDisabled(true);
      const response = await postRequest(
        `/api/v1/tournament/${currentTournamentId}/generate-invite-code`
      );
      if (response.status !== 200) {
        setIsValidCode(false);
        setIsDisabled(false);
        return;
      }

      const json = await response.json();
      const baseUrl = import.meta.env.VITE_URL;
      setInviteCode(`${baseUrl}/join/${json.data}`);
      setIsDisabled(false);
    };

    loadInviteCode();
  }, [currentTournamentId]);

  return (
    <Popup
      title="Invite Your Friends"
      disabled={isDisabled}
      handlePopupClosed={handlePopupClosed}
    >
      <div className={styles.inviteCodeSection}>
        <text className={styles.inviteCodeText}>
          {isValidCode ? inviteCode : 'Failed to get invite code'}
        </text>
        {isValidCode && (
          <button
            className={styles.copyButton}
            onClick={() => handleCopyClicked()}
          >
            <img className={styles.copyButtonImage} src={copy} alt="Copy"></img>
          </button>
        )}
      </div>
    </Popup>
  );
}
