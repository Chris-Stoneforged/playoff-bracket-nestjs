import React, { useEffect, useState } from 'react';
import styles from './CreateTournamentPopup.module.css';
import { getRequest, postRequest } from '../../../utils/routes';
import { BracketData, TournamentData } from '@playoff-bracket-app/database';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import PopupWithSubmit from '../popupTemplate/PopupWithSubmit';

type CreateTournamentPopupProps = {
  handlePopupClosed: (tournament: TournamentData | null) => void;
};

export default function CreateTournamentPopup({
  handlePopupClosed,
}: CreateTournamentPopupProps) {
  const [availableBrackets, setAvailableBrackets] = useState<BracketData[]>([]);
  const [selectedBracket, setSelectedBracket] = useState<number>(-1);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBracketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBracket(Number.parseInt(event.target.value));
  };

  const handleCreateClicked = async () => {
    if (selectedBracket < 0) {
      setErrorText('Must select a bracket');
      return;
    }

    setIsLoading(true);
    const response = await postRequest('/api/v1/tournament/create');
    const json = await response.json();
    handlePopupClosed({
      tournamentId: json.data.tournamentId,
      bracketName: json.data.bracketName,
      memberData: [],
    });
  };

  useEffect(() => {
    const fetchBracketData = async () => {
      const response = await getRequest('/api/v1/brackets');
      const json = await response.json();
      setAvailableBrackets(json.data);
    };

    fetchBracketData().catch(console.error);
  }, []);

  return (
    <PopupWithSubmit
      title="Create Tournament"
      submitButtonText="Create"
      loading={isLoading}
      disabled={isLoading}
      errorText={errorText}
      handlePopupClosed={() => handlePopupClosed(null)}
      handleSubmit={() => handleCreateClicked()}
    >
      <select
        id="dropdown"
        name="dropdown"
        className={styles.dropdownSelect}
        onChange={handleBracketChange}
        value={selectedBracket}
        disabled={isLoading}
      >
        <option hidden value={-1}>
          Select...
        </option>
        {availableBrackets.map((bracket) => (
          <option value={bracket.id}>{bracket.bracket_name}</option>
        ))}
      </select>
    </PopupWithSubmit>
  );
}
