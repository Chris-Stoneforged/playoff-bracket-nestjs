import React from 'react';
import styles from './Popup.module.css';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';

export type PopupProps = {
  children: React.ReactNode;
  title: string;
  disabled: boolean;
  handlePopupClosed: () => void;
};

export default function Popup({
  children,
  title,
  disabled,
  handlePopupClosed,
}: PopupProps) {
  return (
    <div className={styles.popupDarkenator}>
      <div className={styles.popupBody}>
        <div className={styles.topSection}>
          <text className={styles.joinHeaderText}>{title}</text>
          <button
            className={styles.closeButton}
            disabled={disabled}
            onClick={handlePopupClosed}
          >
            X
          </button>
        </div>
        <div className={styles.popupContent}>{children}</div>
      </div>
    </div>
  );
}
