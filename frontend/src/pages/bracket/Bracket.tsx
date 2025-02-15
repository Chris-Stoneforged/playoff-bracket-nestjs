import React from 'react';
import styles from './Bracket.module.css';
import { useLoaderData } from 'react-router-dom';
import { BracketStateData } from '@playoff-bracket-app/database';
import BracketEntry from '../../components/bracketEntry/BracketEntry';

export default function Bracket() {
  const bracketData: BracketStateData = useLoaderData() as BracketStateData;
  console.log(bracketData);

  return (
    <div className={styles.bracketContainer}>
      {bracketData.matchups.map((m) => (
        <BracketEntry state={m} />
      ))}
    </div>
  );
}
