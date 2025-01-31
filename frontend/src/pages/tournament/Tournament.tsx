import { TournamentDetailedData } from '@playoff-bracket-app/database';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Tournament.module.css';
import { useLoaderData } from 'react-router-dom';
import {
  userContext,
  UserDataContext,
  tournamentContext,
} from '../../utils/context';
import TournamentSettingsMenu from '../../components/tournamentSettingsMenu/TournamentSettingsMenu';

export default function Tournament() {
  const { user, setUser }: UserDataContext = useContext(userContext);
  const tournamentData: TournamentDetailedData =
    useLoaderData() as TournamentDetailedData;

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
      <tournamentContext.Provider value={tournamentData.tournamentId}>
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
      </tournamentContext.Provider>
    </div>
  );
}
