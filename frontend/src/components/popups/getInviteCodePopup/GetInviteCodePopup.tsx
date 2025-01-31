import { tournamentContext } from '../../../utils/context';
import { postRequest } from '../../../utils/routes';
import Popup from '../popupTemplate/Popup';
import styles from './GetInviteCodePopup.module.css';
import React, { useContext, useEffect, useState } from 'react';

type GetInviteCodePopupProps = {
  handlePopupClosed: () => void;
};

export default function GetInviteCodePopup({
  handlePopupClosed,
}: GetInviteCodePopupProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isValidCode, setIsValidCode] = useState(true);
  const tournamentId = useContext(tournamentContext);

  const handleCopyClicked = () => {
    navigator.clipboard.writeText(inviteCode);
  };

  useEffect(() => {
    const loadInviteCode = async () => {
      setIsDisabled(true);
      const response = await postRequest(
        `/api/v1/tournament/${tournamentId}/generate-invite-code`
      );
      if (response.status !== 200) {
        setIsValidCode(false);
        setIsDisabled(false);
        return;
      }

      const json = await response.json();
      setInviteCode(json.data);
      setIsDisabled(false);
    };

    loadInviteCode();
  }, []);

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
            Copy
          </button>
        )}
      </div>
    </Popup>
  );
}
