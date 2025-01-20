import React from 'react';
import './HeaderBar.css';

type HeaderBarProps = {
  userName: string;
  handleLogout: () => void;
};

export default function HeaderBar({ userName, handleLogout }: HeaderBarProps) {
  return (
    <div className="background">
      <text className="title">NBA Playoff Bracket</text>
      <div className="user-section">
        <text className="user-name-text">{userName}</text>
        {userName !== '' && (
          <button onClick={() => handleLogout()}>Logout</button>
        )}
      </div>
    </div>
  );
}
