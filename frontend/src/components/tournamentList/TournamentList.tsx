import React from 'react';
import { TournamentData } from '@playoff-bracket-app/database';
import './TournamentList.css';

type TournamentListProps = {
  tournaments: TournamentData[];
  handleClick: (tournamentId: number) => void;
};

export default function TournamentList({
  tournaments,
  handleClick,
}: TournamentListProps) {
  return (
    <div className="tournament-column">
      My Tournaments
      <ul className="tournament-list">
        {tournaments.map((tournament) => (
          <button
            className="tournament-item"
            onClick={() => handleClick(tournament.tournamentId)}
          >
            {tournament.bracketName}
          </button>
        ))}
      </ul>
    </div>
  );
}
