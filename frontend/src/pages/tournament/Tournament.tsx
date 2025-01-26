import {
  TournamentDetailedData,
  UserData,
} from '@playoff-bracket-app/database';
import React, { useContext } from 'react';
import './Tournament.css';
import { useLoaderData } from 'react-router-dom';
import userContext from '../../utils/context';

export default function Tournament() {
  const user: UserData | null = useContext(userContext);
  const tournamentData: TournamentDetailedData =
    useLoaderData() as TournamentDetailedData;

  const handleMemberClicked = (memberId: number) => {
    console.log('clicked member');
  };

  return (
    <div className="tournament-zone">
      <div className="member-list">
        <button
          className="member-button"
          onClick={() => {
            console.log('clicked self');
          }}
        >
          Me
        </button>
        {tournamentData.memberData.map((member) => (
          <button
            className="member-button"
            onClick={() => handleMemberClicked(member.id)}
          >
            {member.nickname}
          </button>
        ))}
      </div>
    </div>
  );
}
