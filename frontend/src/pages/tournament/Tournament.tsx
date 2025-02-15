import React, { useContext, useState } from 'react';
import styles from './Tournament.module.css';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { userContext, interactableBracketContext } from '../../utils/context';
import TournamentSettingsMenu from '../../components/tournamentSettingsMenu/TournamentSettingsMenu';
import { TournamentData, UserData } from '@playoff-bracket-app/database';

export default function Tournament() {
  const navigate = useNavigate();
  const user: UserData = useContext(userContext);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(-1);
  const tournamentData: TournamentData = useLoaderData() as TournamentData;

  const handleMemberClicked = (memberId: number) => {
    setSelectedMemberId(memberId);
    navigate(`/tournament/${tournamentData.tournamentId}/${memberId}`);
  };

  // Set user as the first member in the list
  const memberData = tournamentData.memberData;
  const meIndex = memberData.findIndex((m) => m.id === user?.userId);
  const [me] = memberData.splice(meIndex, 1);
  memberData.unshift(me);

  return (
    <div className={styles.tournamentZone}>
      <interactableBracketContext.Provider
        value={selectedMemberId === user.userId}
      >
        <Outlet />
      </interactableBracketContext.Provider>

      <div className={styles.memberList}>
        {memberData.map((member) => (
          <button
            className={`${styles.memberButton} ${
              member.id === selectedMemberId ? `${styles.selected}` : ''
            }`}
            onClick={() => handleMemberClicked(member.id)}
          >
            {member.id === user?.userId ? 'Me' : member.nickname}
          </button>
        ))}
      </div>
      <TournamentSettingsMenu />
    </div>
  );
}
