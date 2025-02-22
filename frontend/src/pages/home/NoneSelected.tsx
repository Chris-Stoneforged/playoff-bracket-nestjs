import React from 'react';
import styles from './NoneSelected.module.css';

export default function NoneSelected() {
  return (
    <div className={styles.noTournamentDefault}>
      <p>
        <b>Select</b>, <b>Create</b>, or <b>Join</b> a tournament to get
        started!
      </p>
    </div>
  );
}
