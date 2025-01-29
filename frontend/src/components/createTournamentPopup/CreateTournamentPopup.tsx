import React, { useEffect, useState } from 'react';
import styles from './CreateTournamentPopup.module.css';
import { getRequest, postRequest } from '../../utils/routes';
import { BracketData, TournamentData } from '@playoff-bracket-app/database';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

type CreateTournamentPopupProps = {
  handlePopupClosed: (tournament: TournamentData | null) => void;
};

export default function CreateTournamentPopup({
  handlePopupClosed,
}: CreateTournamentPopupProps) {
  const [availableBrackets, setAvailableBrackets] = useState<BracketData[]>([]);
  const [selectedBracket, setSelectedBracket] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);

  const handleBracketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBracket(Number.parseInt(event.target.value));
  };

  const handleCreateClicked = async () => {
    if (selectedBracket < 0) {
      return;
    }

    setIsLoading(true);
    const response = await postRequest('/api/v1/tournament/create');
    const json = await response.json();
    handlePopupClosed({
      tournamentId: json.data.tournamentId,
      bracketName: json.data.bracketName,
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
    <div className={styles.popupDarkenator}>
      <div className={styles.popupBody}>
        <div className={styles.topSection}>
          <text className={styles.createHeaderText}>Create Tournament</text>
          <button
            className={styles.closeButton}
            disabled={isLoading}
            onClick={() => handlePopupClosed(null)}
          >
            X
          </button>
        </div>
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
        <div className={styles.spacer}></div>
        <div className={styles.bottomArea}>
          <button
            className={styles.createButton}
            onClick={() => handleCreateClicked()}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
