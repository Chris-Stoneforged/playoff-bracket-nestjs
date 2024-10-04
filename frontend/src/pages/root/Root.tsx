import React, { useEffect } from 'react';
import { isLoggedIn } from '../../utils/loginUtils';
import './Root.css';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  });

  return (
    <div>
      <div>Root</div>
    </div>
  );
}
