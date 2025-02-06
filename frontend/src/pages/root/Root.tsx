import React, { useEffect, useState } from 'react';
import { deleteCookie, isLoggedIn } from '../../utils/loginUtils';
import styles from './Root.module.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '@playoff-bracket-app/database';
import { getRequest, postRequest, routes } from '../../utils/routes';
import HeaderBar from '../../components/headerBar/HeaderBar';
import { defaultUser, userContext } from '../../utils/context';

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserData>(defaultUser);

  const handleLogoutClick = async () => {
    await postRequest(routes.user.logout);
    setUser(defaultUser);
    navigate('/login');
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchUserData = async () => {
      const response = await getRequest(routes.user.userData);
      if (response.status !== 200) {
        deleteCookie();
        navigate('/login');
        return;
      }

      const json = await response.json();
      setUser(json.user);
    };

    const loggedInUser: UserData = location.state;
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      fetchUserData();
    }
  }, [location.state, navigate]);

  return (
    <div className={styles.rootDiv}>
      <userContext.Provider value={user}>
        <HeaderBar user={user} handleLogout={handleLogoutClick}></HeaderBar>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </userContext.Provider>
    </div>
  );
}
