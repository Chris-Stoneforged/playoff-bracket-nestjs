import React from 'react';
import styles from './Bracket.module.css';
import { useLoaderData } from 'react-router-dom';
import {
  BracketStateData,
  MatchupStateData,
} from '@playoff-bracket-app/database';
import BracketEntry from '../../components/bracketEntry/BracketEntry';

export default function Bracket() {
  const bracketData: BracketStateData = useLoaderData() as BracketStateData;

  const columns: MatchupStateData[][] = [];
  let roundNum = 1;
  let left = true;

  const rootMatchup = bracketData.matchups.find(
    (m) => m.id === bracketData.root_matchup_id
  );
  if (rootMatchup === undefined) {
    throw new Error('Missing root matchup');
  }

  while (roundNum > 0) {
    if (roundNum === rootMatchup?.round) {
      left = false;
      roundNum -= 1;
      continue;
    }

    const matchups = bracketData.matchups.filter(
      // eslint-disable-next-line no-loop-func
      (m) => m.round === roundNum && m.left_side === left
    );
    columns.push(matchups);

    roundNum = left ? roundNum + 1 : roundNum - 1;
  }

  return (
    <div className={styles.bracketContainer}>
      {columns.map((c) => (
        <div className={styles.bracketColumn}>
          {c[0].round === 1 &&
            `${
              c[0].left_side
                ? bracketData.left_side_name
                : bracketData.right_side_name
            }`}
          {c.map((m) => (
            <BracketEntry state={m} />
          ))}
        </div>
      ))}
      <div className={styles.finalMatchup}>
        Finals
        <BracketEntry state={rootMatchup}></BracketEntry>
      </div>
    </div>
  );
}
