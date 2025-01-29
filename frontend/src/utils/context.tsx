import { UserData } from '@playoff-bracket-app/database';
import { createContext } from 'react';

export type UserDataContext = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>> | null;
};

const userContext = createContext<UserDataContext>({
  user: null,
  setUser: null,
});

export default userContext;
