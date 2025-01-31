import React from 'react';
import styles from './PopupWithSubmit.module.css';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import Popup, { PopupProps } from './Popup';

export type PopupWithSubmitProps = PopupProps & {
  submitButtonText: string;
  loading: boolean;
  errorText: string | null;
  handleSubmit: () => void;
};

export default function PopupWithSubmit({
  children,
  title,
  submitButtonText,
  loading,
  disabled,
  errorText,
  handlePopupClosed,
  handleSubmit,
}: PopupWithSubmitProps) {
  return (
    <Popup
      title={title}
      disabled={disabled}
      handlePopupClosed={handlePopupClosed}
    >
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
    </Popup>
  );
}
