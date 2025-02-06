import React, { useContext } from 'react';
import styles from './Tournament.module.css';
import { useLoaderData } from 'react-router-dom';
import { userContext } from '../../utils/context';
import TournamentSettingsMenu from '../../components/tournamentSettingsMenu/TournamentSettingsMenu';
import { TournamentData, UserData } from '@playoff-bracket-app/database';

export default function Tournament() {
  const user: UserData = useContext(userContext);
  const tournamentData: TournamentData = useLoaderData() as TournamentData;

  const handleMemberClicked = (memberId: number) => {
    console.log('clicked member');
  };

  // Set user as the first member in the list
  const memberData = tournamentData.memberData;
  const meIndex = memberData.findIndex((m) => m.id === user?.userId);
  const [me] = memberData.splice(meIndex, 1);
  memberData.unshift(me);

  return (
    <div className={styles.tournamentZone}>
      <div className={styles.bracketZone}></div>
      <div className={styles.overlay}>
        <div className={styles.memberList}>
          {memberData.map((member) => (
            <button
              className={styles.memberButton}
              onClick={() => handleMemberClicked(member.id)}
            >
              {member.id === user?.userId ? 'Me' : member.nickname}
            </button>
          ))}
        </div>
        <TournamentSettingsMenu />
      </div>
    </div>
  );
}
