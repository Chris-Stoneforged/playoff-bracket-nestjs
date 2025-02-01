import React, { useEffect, useRef, useState } from 'react';
import styles from './TournamentSettingsMenu.module.css';
import GetInviteCodePopup from '../popups/getInviteCodePopup/GetInviteCodePopup';
import LeaveTournamentPopup from '../popups/leaveTournamentPopup/LeaveTournamentPopup';

export default function TournamentSettingsMenu() {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isInviteCodePopupOpen, setIsInviteCodePopupOpen] = useState(false);
  const [isLeaveTournamentPopupOpen, setIsLeaveTournamentPopupOpen] =
    useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const settingsButton = useRef<HTMLButtonElement>(null);
  const settingsMenu = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (open: boolean) => {
    if (settingsButton.current) {
      const rect = settingsButton.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.right });
    }
    setIsSettingsMenuOpen(open);
  };

  const handleGetInviteClicked = () => {
    setIsInviteCodePopupOpen(true);
    setIsSettingsMenuOpen(false);
  };

  const handleLeaveTournamentClicked = () => {
    setIsLeaveTournamentPopupOpen(true);
    setIsSettingsMenuOpen(false);
  };

  useEffect(() => {
    if (!isSettingsMenuOpen) {
      return;
    }

    const handleClickAway = (event: MouseEvent) => {
      if (
        settingsMenu.current?.contains(event.target as Node) ||
        settingsMenu.current?.contains(event.target as Node)
      ) {
        return;
      }

      setIsSettingsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [isSettingsMenuOpen]);

  return (
    <div>
      <button
        ref={settingsButton}
        className={styles.settingsButton}
        onClick={() => handleMenuToggle(!isSettingsMenuOpen)}
      >
        V
      </button>
      {isSettingsMenuOpen && (
        <div
          ref={settingsMenu}
          style={{
            position: 'fixed',
            width: '200px',
            top: `${position.top}px`,
            left: `${position.left - 200}px`,
            background: 'white',
            border: '2px solid #1e488b',
            borderRadius: '5px',
            padding: '1px',
            zIndex: 20,
          }}
        >
          <button className={styles.menuItem} onClick={handleGetInviteClicked}>
            Get Invite Code
          </button>
          <button
            className={styles.menuItem}
            onClick={handleLeaveTournamentClicked}
          >
            Leave Tournament
          </button>
        </div>
      )}
      {isInviteCodePopupOpen && (
        <GetInviteCodePopup
          handlePopupClosed={() => setIsInviteCodePopupOpen(false)}
        ></GetInviteCodePopup>
      )}
      {isLeaveTournamentPopupOpen && (
        <LeaveTournamentPopup
          handlePopupClosed={() => setIsLeaveTournamentPopupOpen(false)}
        ></LeaveTournamentPopup>
      )}
    </div>
  );
}
