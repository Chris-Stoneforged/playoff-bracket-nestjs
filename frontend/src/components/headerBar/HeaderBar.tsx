import React from 'react';
import './HeaderBar.css';
import logo from '../../assets/nba-logo.png';
import { UserData } from '@playoff-bracket-app/database';

type HeaderBarProps = {
  user: UserData | null;
  handleLogout: () => void;
};

export default function HeaderBar({ user, handleLogout }: HeaderBarProps) {
  return (
    <div className="background">
      <div className="title-section">
        <img className="logo" src={logo} alt="logo"></img>
        <text className="title">NBA Playoff Bracket</text>
      </div>
      {user != null && (
        <div className="user-section">
          <text className="user-name-text">{user.nickname}</text>
          {user.nickname !== '' && (
            <button onClick={() => handleLogout()}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
}
