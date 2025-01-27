import React, { useEffect, useState } from 'react';
import './CreateTournamentPopup.css';
import { getRequest } from '../../utils/routes';
import { BracketData } from '@playoff-bracket-app/database';

type CreateTournamentPopupProps = {
  handlePopupClosed: () => void;
};

export default function CreateTournamentPopup({
  handlePopupClosed,
}: CreateTournamentPopupProps) {
  const [availableBrackets, setAvailableBrackets] = useState<BracketData[]>([]);

  const handleBracketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Changed');
  };

  const handleCreateClicked = async () => {
    // TODO: Create tournament
  };

  useEffect(() => {
    const fetchBracketData = async () => {
      const response = await getRequest('/api/v1/brackets');
      const json = await response.json();
      console.log(json.data);
      setAvailableBrackets(json.data);
    };

    fetchBracketData().catch(console.error);
  }, []);

  return (
    <div className="popup-darkenator">
      <div className="popup-body">
        <div className="top-section">
          <text className="create-header-text">Create Tournament</text>
          <button className="close-button" onClick={() => handlePopupClosed()}>
            X
          </button>
        </div>
        Select Bracket
        <select
          id="dropdown"
          name="dropdown"
          className="dropdown-select"
          onChange={handleBracketChange}
          defaultValue="Select..."
        >
          {availableBrackets.map((bracket) => (
            <option value={bracket.id}>{bracket.bracket_name}</option>
          ))}
        </select>
        <div className="spacer"></div>
        <div className="bottom-area">
          <button
            className="do-create-button"
            onClick={() => handleCreateClicked()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
