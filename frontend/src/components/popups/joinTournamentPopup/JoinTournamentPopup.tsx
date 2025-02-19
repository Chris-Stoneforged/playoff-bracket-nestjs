import React, { useContext, useState } from 'react';
import styles from './JoinTournamentPopup.module.css';
import PopupWithSubmit from '../popupTemplate/PopupWithSubmit';
import { getRequest, postRequest } from '../../../utils/routes';
import { tournamentContext } from '../../../utils/context';

type JoinTournamentPopupProps = {
  handlePopupClosed: () => void;
};

export default function JoinTournamentPopup({
  handlePopupClosed,
}: JoinTournamentPopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteInfo, setInviteInfo] = useState({ sender: '', bracketName: '' });
  const [hasInvite, setHasInvite] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const handleTournamentsChanged = useContext(tournamentContext);

  const handleCodeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(event.target.value);
  };

  const handleSubmitClicked = async () => {
    if (inviteCode === '') {
      return;
    }

    setIsLoading(true);
    const response = await getRequest(`/api/v1/invite/${inviteCode}`);
    if (response.status !== 200) {
      setErrorText('Invalid invite code');
      setIsLoading(false);
      return;
    }

    const responseJson = await response.json();

    setHasInvite(true);
    setIsLoading(false);
    setErrorText(null);
    setInviteInfo({
      sender: responseJson.data.sender,
      bracketName: responseJson.data.bracketName,
    });
  };

  const handleJoinClicked = async () => {
    setIsLoading(true);
    if (inviteCode === '') {
      return;
    }

    const response = await postRequest(`/api/v1/invite/${inviteCode}/accept`);
    if (response.status !== 200) {
      setErrorText('Something went wrong');
      setIsLoading(false);
    }

    const responseData = await response.json();
    handleTournamentsChanged(
      {
        tournamentId: responseData.data.tournamentId,
        bracketName: responseData.data.bracketName,
        memberData: responseData.data.memberData,
      },
      'Added'
    );

    handlePopupClosed();
  };

  return (
    <PopupWithSubmit
      title="Join Tournament"
      submitButtonText={hasInvite ? 'Join' : 'Submit'}
      loading={isLoading}
      disabled={isLoading}
      errorText={errorText}
      handlePopupClosed={handlePopupClosed}
      handleSubmit={
        hasInvite ? () => handleJoinClicked() : () => handleSubmitClicked()
      }
    >
      {hasInvite ? (
        <div
          className={styles.inviteMessage}
        >{`${inviteInfo.sender} has invited you to join their ${inviteInfo.bracketName} tournament!`}</div>
      ) : (
        <input
          placeholder="Enter invite code..."
          value={inviteCode}
          type="text"
          onInput={handleCodeChanged}
          className={styles.inviteCodeInput}
        ></input>
      )}
    </PopupWithSubmit>
  );
}
