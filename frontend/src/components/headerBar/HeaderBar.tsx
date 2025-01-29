import React from 'react';
import styles from './HeaderBar.module.css';
import logo from '../../assets/nba-logo.png';
import { UserData } from '@playoff-bracket-app/database';

type HeaderBarProps = {
  user: UserData | null;
  handleLogout: () => void;
};

export default function HeaderBar({ user, handleLogout }: HeaderBarProps) {
  return (
    <div className={styles.background}>
      <div className={styles.titleSection}>
        <img className={styles.logo} src={logo} alt="NBA logo"></img>
        <text className={styles.title}>NBA Playoff Bracket</text>
      </div>
      {user != null && (
        <div className={styles.userSection}>
          <text className={styles.userNameText}>{user.nickname}</text>
          {user.nickname !== '' && (
            <button onClick={() => handleLogout()}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
}
