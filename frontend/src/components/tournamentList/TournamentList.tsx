import React, { useState } from 'react';
import { TournamentData } from '@playoff-bracket-app/database';
import './TournamentList.css';
import CreateTournamentPopup from '../createTournamentPopup/CreateTournamentPopup';

type TournamentListProps = {
  tournaments: TournamentData[];
  handleClick: (tournamentId: number) => void;
};

export default function TournamentList({
  tournaments,
  handleClick,
}: TournamentListProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const handlePopupClosed = (tournamentId: number | null) => {
    setIsCreatePopupOpen(false);
    if (tournamentId === null) {
      return;
    }

    console.log(tournamentId);
    handleClick(tournamentId);
  };

  return (
    <div className={`tournament-column ${isExpanded ? 'open' : ''}`}>
      <div className="list-header">
        <button
          className="expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '<' : '>'}
        </button>
        <text className="header-text">
          {isExpanded ? 'My Tournaments' : ''}
        </text>
      </div>
      <div className="tournament-list">
        {tournaments.map((tournament) => (
          <button
            className="tournament-item"
            onClick={() => handleClick(tournament.tournamentId)}
          >
            <div className="tournament-item-content">
              {tournament.bracketName}
              <text className="tournament-item-sub-text">
                With Kenny, Cam, Ash...
              </text>
            </div>
          </button>
        ))}
      </div>
      <div className="spacer"></div>
      <button
        className="create-button"
        onClick={() => setIsCreatePopupOpen(true)}
      >
        Create Tournament
      </button>
      {isCreatePopupOpen && (
        <CreateTournamentPopup handlePopupClosed={handlePopupClosed} />
      )}
    </div>
  );
}
