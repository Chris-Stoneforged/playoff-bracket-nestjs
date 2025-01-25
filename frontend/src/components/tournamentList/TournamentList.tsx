import React, { useState } from 'react';
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
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="tournament-column">
      <div className="list-header">
        My Tournaments
        <button onClick={() => setExpanded(!expanded)}></button>
      </div>
      <div className="tournament-list">
        {tournaments.map((tournament) => (
          <button
            className="tournament-item"
            onClick={() => handleClick(tournament.tournamentId)}
          >
            <div className="button-content">
              {tournament.bracketName}
              <text className="button-sub-text">With Kenny, Cam, Ash...</text>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
