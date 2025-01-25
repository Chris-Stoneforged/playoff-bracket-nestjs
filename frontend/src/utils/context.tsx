import { UserData } from '@playoff-bracket-app/database';
import { createContext } from 'react';

const userContext = createContext<UserData | null>(null);

export default userContext;
