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

  const memberData = tournamentData.memberData;
  const meIndex = memberData.findIndex((m) => m.id === user?.userId);
  const [me] = memberData.splice(meIndex, 1);
  memberData.unshift(me);

  const handleMemberClicked = (memberId: number) => {
    console.log('clicked member');
  };

  return (
    <div className="tournament-zone">
      <div className="member-list">
        {memberData.map((member) => (
          <button
            className="member-button"
            onClick={() => handleMemberClicked(member.id)}
          >
            {member.id === user?.userId ? 'Me' : member.nickname}
          </button>
        ))}
      </div>
    </div>
  );
}
