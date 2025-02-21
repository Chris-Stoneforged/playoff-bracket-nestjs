import React, { useContext } from 'react';
import styles from './Tournament.module.css';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { userContext, tournamentIdContext } from '../../utils/context';
import TournamentSettingsMenu from '../../components/tournamentSettingsMenu/TournamentSettingsMenu';
import { TournamentData, UserData } from '@playoff-bracket-app/database';

export default function Tournament() {
  const navigate = useNavigate();
  const user: UserData = useContext(userContext);
  const { userId } = useParams<{ userId: string }>();
  const tournamentData: TournamentData = useLoaderData() as TournamentData;
  const selectedMemberId: number = userId ? Number.parseInt(userId) : -1;

  const handleMemberClicked = (memberId: number) => {
    navigate(`/tournament/${tournamentData.tournamentId}/${memberId}`);
  };

  // Set user as the first member in the list
  const memberData = tournamentData.memberData;
  const meIndex = memberData.findIndex((m) => m.id === user?.userId);
  const [me] = memberData.splice(meIndex, 1);
  memberData.unshift(me);

  return (
    <div className={styles.tournamentZone}>
      <tournamentIdContext.Provider value={tournamentData.tournamentId}>
        <Outlet />
      </tournamentIdContext.Provider>

      <div className={styles.memberList}>
        {memberData.map((member) => (
          <button
            className={`${styles.memberButton} ${
              member.id === selectedMemberId ? styles.selected : ''
            }`}
            onClick={() => handleMemberClicked(member.id)}
          >
            {member.id === user?.userId ? 'Me' : member.nickname}
            <text className={styles.scoreText}>{`Score: ${member.score}`}</text>
          </button>
        ))}
      </div>
      <TournamentSettingsMenu />
    </div>
  );
}
