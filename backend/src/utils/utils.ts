import { Tournament, User } from '@prisma/client';
import crypto from 'crypto';

export function createInviteToken(
  user: User,
  tournament: Tournament,
  timeToLive: number
): [string, Date] {
  const expiry = new Date(Date.now() + timeToLive);
  const string = `${tournament.id}${user.id}${expiry}`;
  const code = crypto.createHash('sha1').update(string).digest('hex');
  return [code, expiry];
}

export function isNumberOfGamesValid(
  numberOfGames: number,
  bestOf: number
): boolean {
  const min = Math.ceil(bestOf / 2);
  return numberOfGames >= min && numberOfGames <= bestOf;
}
