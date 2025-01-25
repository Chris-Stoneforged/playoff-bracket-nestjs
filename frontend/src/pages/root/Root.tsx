import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../../utils/loginUtils';
import './Root.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '@playoff-bracket-app/database';
import { getRequest, postRequest, routes } from '../../utils/routes';
import TournamentList from '../../components/tournamentList/TournamentList';
import TournamentPanel from '../../components/tournamentPanel/TournamentPanel';
import HeaderBar from '../../components/headerBar/HeaderBar';

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserData>({
    nickname: '',
    tournaments: [],
  });

  const fetchUserData = async () => {
    const response = await getRequest(routes.user.userData);
    if (response.status !== 200) {
      alert('Failed to get user data');
      return;
    }

    const json = await response.json();
    console.log(json.user);
    setUser(json.user);
  };

  const handleLogoutClick = async () => {
    await postRequest(routes.user.logout);
    navigate('/login');
  };

  const handleTournamentClicked = (tournamentId: number) => {
    console.log(`Selected tournament with id ${tournamentId}`);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login', { replace: true });
      return;
    }

    const loggedInUser: UserData = location.state;
    if (loggedInUser) {
      setUser(loggedInUser);
      console.log(loggedInUser);
    } else {
      fetchUserData();
    }
  }, [location.state, navigate]);

  return (
    <div style={{ height: '100%' }}>
      <HeaderBar
        userName={user.nickname}
        handleLogout={handleLogoutClick}
      ></HeaderBar>
      <div className="main">
        <TournamentList
          tournaments={user.tournaments}
          handleClick={handleTournamentClicked}
        ></TournamentList>
        <TournamentPanel />
      </div>
    </div>
  );
}
