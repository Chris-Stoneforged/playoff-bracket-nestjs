import React, { useContext, useState } from 'react';
import { TournamentData } from '@playoff-bracket-app/database';
import styles from './TournamentList.module.css';
import CreateTournamentPopup from '../popups/createTournamentPopup/CreateTournamentPopup';
import { userContext, UserDataContext } from '../../utils/context';
import { useNavigate } from 'react-router-dom';
import JoinTournamentPopup from '../popups/joinTournamentPopup/JoinTournamentPopup';

export default function TournamentList() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);
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
    setIsJoinPopupOpen(false);

    if (tournament === null) {
      return;
    }

    handleTournamentClicked(tournament.tournamentId);
    setUser({ ...user, tournaments: [...user.tournaments, tournament] });
  };

  return (
    <div
      className={`${styles.tournamentColumn} ${isExpanded ? styles.open : ''}`}
    >
      <div className={styles.listHeader}>
        <button
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '<' : '>'}
        </button>
        <text className={styles.headerText}>
          {isExpanded ? 'My Tournaments' : ''}
        </text>
      </div>
      <div className={styles.tournamentList}>
        {user.tournaments.map((tournament) => (
          <button
            className={styles.tournamentItem}
            onClick={() => handleTournamentClicked(tournament.tournamentId)}
          >
            <div className={styles.tournamentItemContent}>
              {tournament.bracketName}
              <text className={styles.tournamentItemSubText}>
                With Kenny, Cam, Ash...
              </text>
            </div>
          </button>
        ))}
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.bottomButtons}>
        <button
          className={styles.bottomButton}
          onClick={() => setIsCreatePopupOpen(true)}
        >
          Create
        </button>
        <button
          className={styles.bottomButton}
          onClick={() => setIsJoinPopupOpen(true)}
        >
          Join
        </button>
      </div>

      {isCreatePopupOpen && (
        <CreateTournamentPopup handlePopupClosed={handlePopupClosed} />
      )}
      {isJoinPopupOpen && (
        <JoinTournamentPopup handlePopupClosed={handlePopupClosed} />
      )}
    </div>
  );
}
