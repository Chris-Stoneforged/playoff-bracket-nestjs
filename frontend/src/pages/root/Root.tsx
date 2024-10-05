import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../../utils/loginUtils';
import './Root.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '@playoff-bracket-app/database';
import { getRequest, postRequest, routes } from '../../utils/routes';

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
    setUser(json.user);
  };

  const handleLogoutClick = async () => {
    await postRequest(routes.user.logout);
    navigate('/login');
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login', { replace: true });
      return;
    }

    const loggedInUser: UserData = location.state;
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      fetchUserData();
    }
  }, [location.state, navigate]);

  return (
    <div>
      <div>
        {user.nickname}
        {user.nickname !== '' && (
          <button onClick={() => handleLogoutClick()}>Logout</button>
        )}
      </div>
    </div>
  );
}
