import React from 'react';
import styles from './PopupTemplate.module.css';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

export type PopupTemplateProps = {
  children: React.ReactNode;
  title: string;
  submitButtonText: string;
  loading: boolean;
  disabled: boolean;
  errorText: string | null;
  handlePopupClosed: () => void;
  handleSubmit: () => void;
};

export default function PopupTemplate({
  children,
  title,
  submitButtonText,
  loading,
  disabled,
  errorText,
  handlePopupClosed,
  handleSubmit,
}: PopupTemplateProps) {
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
        <div className={styles.bottomArea}>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={disabled}
          >
            {loading ? <LoadingSpinner /> : submitButtonText}
          </button>
        </div>
        {errorText !== null && (
          <div className={styles.errorArea}>{errorText}</div>
        )}
      </div>
    </div>
  );
}
