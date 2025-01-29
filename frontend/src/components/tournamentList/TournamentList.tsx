import React, { useContext, useState } from 'react';
import { TournamentData } from '@playoff-bracket-app/database';
import './TournamentList.css';
import CreateTournamentPopup from '../createTournamentPopup/CreateTournamentPopup';
import userContext, { UserDataContext } from '../../utils/context';
import { useNavigate } from 'react-router-dom';

export default function TournamentList() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const navigate = useNavigate();

  const { user, setUser }: UserDataContext = useContext(userContext);
  if (user === null || setUser === null) {
    return null;
  }

  const handleTournamentClicked = (tournamentId: number) => {
    navigate(`/tournament/${tournamentId}`);
  };

  const handlePopupClosed = (tournament: TournamentData | null) => {
    setIsCreatePopupOpen(false);
    if (tournament === null) {
      return;
    }

    handleTournamentClicked(tournament.tournamentId);
    setUser({ ...user, tournaments: [...user.tournaments, tournament] });
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
        {user.tournaments.map((tournament) => (
          <button
            className="tournament-item"
            onClick={() => handleTournamentClicked(tournament.tournamentId)}
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
