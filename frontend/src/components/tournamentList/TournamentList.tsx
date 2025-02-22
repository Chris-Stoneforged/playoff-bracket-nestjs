import React, { useContext, useState } from 'react';
import { TournamentData, UserData } from '@playoff-bracket-app/database';
import styles from './TournamentList.module.css';
import { tournamentContext, userContext } from '../../utils/context';
import { useNavigate, useParams } from 'react-router-dom';

export type TournamentListProps = {
  tournaments: TournamentData[];
};

export default function TournamentList({ tournaments }: TournamentListProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const handleTournamentsChanged = useContext(tournamentContext);
  const user: UserData = useContext(userContext);
  const selectedTournamentId: number = tournamentId
    ? Number.parseInt(tournamentId)
    : -1;

  // Memoize lables
  const memberLabels: Map<number, string> = new Map();
  tournaments.forEach((t) => {
    const otherMembers = t.memberData.filter((m) => m.id !== user.userId);
    let label: string;
    if (otherMembers.length === 0) {
      label = 'Just You';
    } else if (otherMembers.length === 1) {
      label = `With ${otherMembers[0].nickname}`;
    } else if (otherMembers.length === 2) {
      label = `With ${otherMembers[0].nickname} and ${otherMembers[1].nickname}`;
    } else {
      label = `With ${otherMembers[0].nickname}, ${otherMembers[1].nickname}, ...`;
    }
    memberLabels.set(t.tournamentId, label);
  });

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
        {tournaments.map((tournament) => (
          <button
            className={`${styles.tournamentItem} ${
              tournament.tournamentId === selectedTournamentId
                ? styles.selected
                : ''
            }`}
            onClick={() => handleTournamentsChanged(tournament, 'Selected')}
          >
            <div className={styles.tournamentItemContent}>
              {tournament.bracketName}
              <text className={styles.tournamentItemSubText}>
                {memberLabels.get(tournament.tournamentId)}
              </text>
            </div>
          </button>
        ))}
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.bottomButtons}>
        <button
          className={styles.bottomButton}
          onClick={() => navigate('/create')}
        >
          Create
        </button>
        {/* <button
          className={styles.bottomButton}
          onClick={() => setIsJoinPopupOpen(true)}
        >
          Join
        </button> */}
      </div>
    </div>
  );
}
