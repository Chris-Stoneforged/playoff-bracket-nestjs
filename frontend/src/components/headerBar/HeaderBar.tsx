import React from 'react';
import './HeaderBar.css';
import logo from '../../assets/nba-logo.png';

type HeaderBarProps = {
  userName: string;
  handleLogout: () => void;
};

export default function HeaderBar({ userName, handleLogout }: HeaderBarProps) {
  return (
    <div className="background">
      <div className="title-section">
        <img className="logo" src={logo} alt="logo"></img>
        <text className="title">NBA Playoff Bracket</text>
      </div>
      <div className="user-section">
        <text className="user-name-text">{userName}</text>
        {userName !== '' && (
          <button onClick={() => handleLogout()}>Logout</button>
        )}
      </div>
    </div>
  );
}
